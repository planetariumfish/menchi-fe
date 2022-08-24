import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ActiveUser } from "./contexts";
import axios from "../utils/axiosClient";
import { User } from "../types/types";

type Props = {
  children?: React.ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [userId, setUserId] = React.useState<string | null>(null);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const getUserOnLoad = async () => {
      const login = await axios.get("/users");
      if (login.data) {
        setUserId(login.data.id);
        setUser(login.data);
      }
    };
    getUserOnLoad();
  }, []);

  // clear user in state if userId is set to null
  React.useEffect(() => {
    if (!userId) setUser(null);
  }, [userId]);

  const { data, isLoading, refetch } = useQuery(
    ["userInfo"],
    async () => {
      const result = await axios.get("/users");
      return result.data;
    },
    {
      onSuccess: (data) => {
        setUser(data);
      },
      enabled: !!userId,
    }
  );

  return (
    <ActiveUser.Provider
      value={{ user, setUser, setUserId, isLoading, refetch }}
    >
      {children}
    </ActiveUser.Provider>
  );
};

export default UserProvider;
