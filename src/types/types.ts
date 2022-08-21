import { z } from "zod";
import { Pet } from "../schemas/pet.zod";
import { User, NewUser, LoginInfo } from "../schemas/user.zod";

export type User = z.infer<typeof User>;

export type NewUser = z.infer<typeof NewUser>;

export type LoginInfo = z.infer<typeof LoginInfo>;

export type Pet = z.infer<typeof Pet>;
