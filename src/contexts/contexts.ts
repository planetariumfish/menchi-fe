import { createContext } from "react";
import { User } from "../types/types";

export const ActiveUser = createContext<User | null>(null);
