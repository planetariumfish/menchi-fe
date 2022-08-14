import { z } from "zod";

export const NewUser = z.object({
  firstname: z.string(),
  lastname: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8),
  repassword: z.string().min(8),
});

export const User = z.object({
  id: z.string().uuid(),
  firstname: z.string(),
  lastname: z.string().optional(),
  email: z.string().email(),
  // role: z.nativeEnum(Role), // where to get the enum from? (set on the DB)
  phone: z.string().optional(),
  bio: z.string().optional(),
  photo: z.string().optional(),
});
