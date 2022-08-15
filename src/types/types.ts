import { z } from "zod";
import { User } from "../schemas/user.zod";

export type User = z.infer<typeof User>;
