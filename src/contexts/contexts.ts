import { QueryObserverResult } from "@tanstack/react-query";
import React, { createContext } from "react";
import { User } from "../types/types";

export const ActiveUser = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>> | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>> | null;
  isLoading: Boolean;
  refetch: (() => Promise<QueryObserverResult>) | null;
}>({
  user: null,
  setUser: null,
  setToken: null,
  isLoading: false,
  refetch: null,
});
