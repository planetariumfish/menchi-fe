import { z } from "zod";
import { AnimalType, Status } from "./pet.zod";

export const Search = z.object({
  animalType: z.enum(AnimalType).or(z.string()),
  status: z.enum(Status).or(z.string()).optional(),
  height: z.tuple([z.number(), z.number()]),
  weight: z.tuple([z.number(), z.number()]),
  query: z.string().optional(),
  advanced: z.boolean(),
});
