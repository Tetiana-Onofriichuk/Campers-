// utils/getFiltersFromParams.ts
import type { CamperFilters, EquipmentKey } from "@/types/camper";

export function buildFiltersFromSearchParams(
  sp: URLSearchParams
): CamperFilters {
  const location = sp.get("location") ?? "";

  const formParam = sp.get("form");
  const form = formParam ? (formParam as CamperFilters["form"]) : null;

  const equipment = sp.getAll("equipment") as EquipmentKey[];

  return {
    location,
    form,
    equipment,
  };
}
