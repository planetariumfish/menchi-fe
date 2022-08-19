import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ActiveUser } from "./contexts";
import axios from "axios";

type Props = {
  children?: React.ReactNode;
};

// Notes:
//  Should save userId to localStorage when it gets one
//  When it finds one on load, should try to fetch user info from server using stored token (if any)
//  if token is valid, should set the app state to logged in
//  CURRENT STATUS: unreliable (works sometimes though. why?)

const UserProvider = ({ children }: Props) => {
  const [userId, setUserId] = React.useState<string | null>(null);
  const [userPresentInLocalStorage, setUserPresentInLocalStorage] =
    React.useState<boolean>(false);
  const context = { userId, setUserId };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    if (token && id) setUserPresentInLocalStorage(true);
  }, []);

  useEffect(() => {
    console.log("Storing User id!", userId);
    if (userId) localStorage.setItem("userId", userId);
  }, [userId]);

  const user = useQuery(
    ["userInfo"],
    async () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("userId");

      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/${id}`,
        {
          headers: {
            "x-access-token": token || "",
          },
        }
      );
      return result.data;
    },
    {
      onSuccess: () => {
        if (user.data) setUserId(user.data.id);
      },
      onError: () => {
        localStorage.clear();
        setUserId(null);
      },
      enabled: userPresentInLocalStorage,
    }
  );

  return <ActiveUser.Provider value={context}>{children}</ActiveUser.Provider>;
};

export default UserProvider;
