import type { CamperFilters, EquipmentKey, VehicleForm } from "@/types/camper";
import type { ReadonlyURLSearchParams } from "next/navigation";

export function buildFiltersFromSearchParams(
  sp: ReadonlyURLSearchParams
): CamperFilters {
  const location = sp.get("location") ?? "";

  const formParam = sp.get("form");
  const form: VehicleForm | null = formParam
    ? (formParam as VehicleForm)
    : null;

  const equipment = sp.getAll("equipment") as EquipmentKey[];

  return {
    location,
    form,
    equipment,
  };
}
