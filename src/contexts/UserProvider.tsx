import React from "react";
import { User } from "../types/types";
import { ActiveUser } from "./contexts";

type Props = {
  children?: React.ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<User | null>(null);
  const value = { user, setUser };

  return <ActiveUser.Provider value={user}>{children}</ActiveUser.Provider>;
};

export default UserProvider;
