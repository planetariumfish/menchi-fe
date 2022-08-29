import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "../utils/axiosClient";

interface BookmarkState {
  bookmarks: string[];
  load: (id: string) => void;
  add: (bookmark: string) => void;
  remove: (bookmark: string) => void;
}

const useBookmarkStore = create<BookmarkState>()(
  devtools(
    persist(
      (set) => ({
        bookmarks: [],
        load: async (id: string) => {
          const result = await axios.get(`/pets/user/${id}/saved`);
          set({ bookmarks: result.data });
        },
        add: (bookmark) =>
          set((state) => ({ bookmarks: [...state.bookmarks, bookmark] })),
        remove: (bookmark) =>
          set((state) => ({
            bookmarks: state.bookmarks.filter((e) => e !== bookmark),
          })),
      }),
      {
        name: "bookmark-storage",
      }
    )
  )
);

export default useBookmarkStore;
