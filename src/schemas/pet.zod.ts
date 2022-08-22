import { z } from "zod";

const AnimalType = [
  "Dog",
  "Cat",
  "Rat",
  "Bird",
  "Rabbit",
  "Ferret",
  "Other",
] as const;

export const Pet = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(AnimalType),
  breed: z.string(),
  status: z.enum(["AVAILABLE", "ADOPTED", "FOSTERED"]),
  picture: z.string().optional(),
  height: z.number(),
  weight: z.number(),
  color: z.string(),
  bio: z.string().optional(),
  hypoallergenic: z.boolean(),
  dietary: z.array(z.string().optional()),
  added: z.date(),
  returned: z.date().optional(),
  tags: z.array(z.string().optional()),
});
