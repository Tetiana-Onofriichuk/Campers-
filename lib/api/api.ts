import axiosInstance from "./axiosInstance";
import type {
  Camper,
  CamperFilters,
  CampersResponse,
  EquipmentKey,
} from "@/types/camper";
import axios from "axios";

const DEFAULT_LIMIT = 4;

function buildParams(page: number, limit: number, filters: CamperFilters) {
  const params: Record<string, string | number | boolean> = { page, limit };

  if (filters.location.trim()) {
    params.location = filters.location.trim();
  }

  if (filters.form) {
    params.form = filters.form;
  }

  filters.equipment.forEach((key: EquipmentKey) => {
    params[key] = true;
  });

  return params;
}

export async function fetchCampers(
  page: number,
  limit: number = DEFAULT_LIMIT,
  filters: CamperFilters
): Promise<CampersResponse> {
  const params = buildParams(page, limit, filters);

  try {
    const { data } = await axiosInstance.get<CampersResponse>("/campers", {
      params,
    });

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return {
        items: [],
        total: 0,
        page,
        limit,
      } as CampersResponse;
    }

    throw error;
  }
}

export async function getCamperById(id: string): Promise<Camper | null> {
  try {
    const { data } = await axiosInstance.get<Camper>(`/campers/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }

    throw error;
  }
}
