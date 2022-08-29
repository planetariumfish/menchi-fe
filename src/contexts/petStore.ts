import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "../utils/axiosClient";

interface PetState {
  pets: string[];
  load: (id: string) => void;
  add: (bookmark: string) => void;
  remove: (bookmark: string) => void;
  reset: () => void;
}

const usePetStore = create<PetState>()(
  devtools(
    persist(
      (set) => ({
        pets: [],
        load: async (id: string) => {
          const result = await axios.get(`/pets/user/${id}`);
          set({ pets: result.data });
        },
        add: (pet) => set((state) => ({ pets: [...state.pets, pet] })),
        remove: (pet) =>
          set((state) => ({
            pets: state.pets.filter((e) => e !== pet),
          })),
        reset: () => set({ pets: [] }),
      }),
      {
        name: "pet-storage",
      }
    )
  )
);

export default usePetStore;
