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
  lastname: z.string().or(z.null()),
  email: z.string().email(),
  role: z.enum(["USER", "ADMIN"]),
  phone: z.string().or(z.null()),
  bio: z.string().max(400).or(z.null()),
  photo: z.string().or(z.null()),
  returned: z.date().or(z.null()),
});

export const LoginInfo = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const ChangePassword = z.object({
  oldpassword: z.string().min(8),
  password: z.string().min(8),
  repassword: z.string().min(8),
});
