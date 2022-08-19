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
  role: z.string(), // is actually enum on BE
  phone: z.string().optional(),
  bio: z.string().optional(),
  photo: z.string().optional(),
  returned: z.date().optional(),
});

export const LoginInfo = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
