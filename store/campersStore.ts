import { create } from "zustand";
import { fetchCampers } from "@/lib/api/api";
import type { Camper, CamperFilters } from "@/types/camper";

interface CampersState {
  campers: Camper[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  filters: CamperFilters;

  loadFirstPage: (filters: CamperFilters) => Promise<void>;
  loadMore: () => Promise<void>;
}

export const useCampersStore = create<CampersState>((set, get) => ({
  campers: [],
  total: 0,
  page: 1,
  limit: 4,
  isLoading: false,
  filters: { location: "", form: null, equipment: [] },

  loadFirstPage: async (filters) => {
    set({ isLoading: true, page: 1, filters });

    const { items, total } = await fetchCampers(1, get().limit, filters);

    set({
      campers: items,
      total,
      page: 1,
      isLoading: false,
    });
  },

  loadMore: async () => {
    const { page, limit, filters, campers } = get();

    set({ isLoading: true });

    const nextPage = page + 1;

    const { items } = await fetchCampers(nextPage, limit, filters);

    set({
      campers: [...campers, ...items],
      page: nextPage,
      isLoading: false,
    });
  },
}));
