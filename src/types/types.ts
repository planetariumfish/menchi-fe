import { z } from "zod";
import { NewPet, Pet } from "../schemas/pet.zod";
import { User, NewUser, LoginInfo, ChangePassword } from "../schemas/user.zod";

export type User = z.infer<typeof User>;

export type NewUser = z.infer<typeof NewUser>;

export type LoginInfo = z.infer<typeof LoginInfo>;

export type ChangePassword = z.infer<typeof ChangePassword>;

export type Pet = z.infer<typeof Pet>;

export type NewPet = z.infer<typeof NewPet>;

export type ModalProps = { onClose: () => void; isOpen: boolean };

export type Bookmark = {
  userId: string;
  petId: string;
};
