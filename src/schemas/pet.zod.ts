import { z } from "zod";

export const AnimalType = [
  "Dog",
  "Cat",
  "Rat",
  "Bird",
  "Rabbit",
  "Ferret",
  "Other",
] as const;

export const Status = ["AVAILABLE", "ADOPTED", "FOSTERED"] as const;

export const Pet = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(AnimalType),
  breed: z.string(),
  status: z.enum(Status),
  picture: z.string().optional(),
  height: z.number(),
  weight: z.number(),
  color: z.string(),
  bio: z.string().optional(),
  hypoallergenic: z.boolean(),
  dietary: z.array(z.string().optional()),
  added: z.date(),
  userId: z.string().optional(),
  returned: z.date().optional(),
  tags: z.array(z.string().optional()),
});

export const NewPet = z.object({
  name: z.string(),
  type: z.enum(AnimalType),
  breed: z.string(),
  height: z.number(),
  weight: z.number(),
  color: z.string(),
  bio: z.string().optional(),
  hypoallergenic: z.boolean(),
  dietary: z.array(z.string().optional()),
  tags: z.array(z.string().optional()),
});
