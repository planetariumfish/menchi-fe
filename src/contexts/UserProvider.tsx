import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ActiveUser } from "./contexts";
import axios from "axios";
import { User } from "../types/types";

type Props = {
  children?: React.ReactNode;
};

// Notes:
//  Get token from localStorage if any and tries to validate on BE
//  if token is valid, should set the app state to logged in
//  CURRENT STATUS: it does work on reload, doesn't rerender on login! >.<#

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const context = { user, setUser, setToken };
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

  const userInfo = useQuery(
    ["userInfo"],
    async () => {
      const t = token;
      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/`,
        {
          headers: {
            "x-access-token": t || "",
          },
        }
      );
      return result.data;
    },
    {
      onSuccess: () => {
        if (userInfo.data) setUser(userInfo.data);
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

  return <ActiveUser.Provider value={context}>{children}</ActiveUser.Provider>;
};

export default UserProvider;
