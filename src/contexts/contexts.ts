import React, { createContext } from "react";
import { User } from "../types/types";

export const ActiveUser = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>> | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>> | null;
}>({ user: null, setUser: null, setToken: null });
