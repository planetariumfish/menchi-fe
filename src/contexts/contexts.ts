import React, { createContext } from "react";

export const ActiveUser = createContext<{
  userId: String | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>> | null;
}>({ userId: null, setUserId: null });
