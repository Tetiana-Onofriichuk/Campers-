"use client";

import { FormEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterItem from "@/components/Filters/FilterItem";
import css from "./CatalogFilters.module.css";

type Filters = {
  location: string;
  equipment: string[];
  form: string;
};

export default function CatalogFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const [tempFilters, setTempFilters] = useState<Filters>({
    location: sp.get("location") ?? "",
    equipment: sp.getAll("equipment") ?? [],
    form: sp.get("form") ?? "",
  });

  const updateFilter = (name: keyof Filters, value: string, multi: boolean) => {
    setTempFilters((prev) => {
      if (multi) {
        const current = prev[name] as string[];
        const set = new Set(current);

        if (set.has(value)) {
          set.delete(value);
        } else {
          set.add(value);
        }

        return { ...prev, [name]: Array.from(set) };
      }

      return { ...prev, [name]: prev[name] === value ? "" : value };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const next = new URLSearchParams();

    if (tempFilters.location.trim()) {
      next.set("location", tempFilters.location.trim());
    }

    if (tempFilters.equipment.length > 0) {
      tempFilters.equipment.forEach((eq) => next.append("equipment", eq));
    }

    if (tempFilters.form) {
      next.set("form", tempFilters.form);
    }

    next.delete("page");
    router.push(`${pathname}?${next.toString()}`);
  };

  const handleReset = () => {
    setTempFilters({
      location: "",
      equipment: [],
      form: "",
    });

    router.push(pathname);
  };

  return (
    <aside className={css.filters}>
      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.block}>
          <p className={css.label}>Location</p>

          <div
            className={`${css.locationInputWrapper} ${
              tempFilters.location ? css.hasValue : ""
            }`}
          >
            <svg className={css.locationIcon} aria-hidden="true">
              <use href="sprite.svg#icon-location" />
            </svg>

            <input
              name="location"
              className={css.locationInput}
              type="text"
              placeholder="Kyiv, Ukraine"
              value={tempFilters.location}
              onChange={(e) =>
                setTempFilters({ ...tempFilters, location: e.target.value })
              }
            />
          </div>
        </div>

        <p className={css.sectionCaption}>Filters</p>

        <div className={css.block}>
          <p className={css.sectionTitle}>Vehicle equipment</p>
          <div className={css.divider} />

          <ul className={css.chipsGrid}>
            {[
              "AC",
              "kitchen",
              "bathroom",
              "TV",
              "radio",
              "refrigerator",
              "microwave",
              "gas",
            ].map((eq) => (
              <FilterItem
                key={eq}
                name="equipment"
                value={eq}
                label={eq[0].toUpperCase() + eq.slice(1)}
                multi
                variant="pill"
                iconId={
                  eq === "AC"
                    ? "wind"
                    : eq === "kitchen"
                      ? "kitchen"
                      : eq === "bathroom"
                        ? "shower"
                        : eq === "TV"
                          ? "tv"
                          : eq === "radio"
                            ? "radio"
                            : eq === "refrigerator"
                              ? "fridge"
                              : eq === "microwave"
                                ? "microwave"
                                : "gas"
                }
                activeItems={tempFilters.equipment}
                onSelect={updateFilter}
              />
            ))}
          </ul>
        </div>

        <div className={css.block}>
          <p className={css.sectionTitle}>Vehicle type</p>
          <div className={css.divider} />

          <ul className={css.chipsGrid}>
            <FilterItem
              name="form"
              value="panelTruck"
              label="Van"
              variant="pill"
              iconId="bi_grid-1x2"
              activeItem={tempFilters.form}
              onSelect={updateFilter}
            />

            <FilterItem
              name="form"
              value="fullyIntegrated"
              label="Fully integrated"
              variant="pill"
              iconId="bi_grid-3x3-gap"
              activeItem={tempFilters.form}
              onSelect={updateFilter}
            />

            <FilterItem
              name="form"
              value="alcove"
              label="Alcove"
              variant="pill"
              iconId="bi_grid"
              activeItem={tempFilters.form}
              onSelect={updateFilter}
            />
          </ul>
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.searchBtn}>
            Search
          </button>

          <button type="button" className={css.resetBtn} onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </aside>
  );
}
