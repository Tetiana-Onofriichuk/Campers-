import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Camper } from "@/types/camper";

type FavoritesState = {
  favorites: Camper[];
  toggleFavorite: (camper: Camper) => void;
  isFavorite: (id: string | number) => boolean;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (camper) => {
        const { favorites } = get();
        const exists = favorites.some((item) => item.id === camper.id);

        set({
          favorites: exists
            ? favorites.filter((item) => item.id !== camper.id)
            : [...favorites, camper],
        });
      },
      isFavorite: (id) =>
        get().favorites.some((item) => String(item.id) === String(id)),
    }),
    {
      name: "campers-favorites",
    }
  )
);
