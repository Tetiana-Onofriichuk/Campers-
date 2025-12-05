"use client";

import { FormEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterItem from "@/components/Filters/FilterItem";
import css from "./CatalogFilters.module.css";

export default function CatalogFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  // ЛОКАЛЬНИЙ СТАН ФІЛЬТРІВ
  const [tempFilters, setTempFilters] = useState({
    location: sp.get("location") ?? "",
    equipment: sp.getAll("equipment") ?? [],
    form: sp.get("form") ?? "",
  });

  // ОНОВЛЕННЯ ВИБРАНОГО ФІЛЬТРА
  const updateFilter = (name: string, value: string, multi: boolean) => {
    setTempFilters((prev) => {
      if (multi) {
        const set = new Set(prev[name] as string[]);
        set.has(value) ? set.delete(value) : set.add(value);
        return { ...prev, [name]: Array.from(set) };
      }

      return { ...prev, [name]: prev[name] === value ? "" : value };
    });
  };

  // НАТИСКАННЯ SEARCH → застосовуємо фільтри
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

  // RESET → очищаємо фільтри і URL
  const handleReset = () => {
    setTempFilters({
      location: "",
      equipment: [],
      form: "",
    });

    router.push(pathname); // очищення URL-параметрів
  };

  return (
    <aside className={css.filters}>
      <form onSubmit={handleSubmit} className={css.form}>
        {/* Location */}
        <div className={css.block}>
          <p className={css.label}>Location</p>

          <div
            className={`${css.locationInputWrapper} ${tempFilters.location ? css.hasValue : ""}`}
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

        {/* Vehicle equipment */}
        <div className={css.block}>
          <p className={css.sectionTitle}>Vehicle equipment</p>
          <div className={css.divider} />

          <ul className={css.chipsGrid}>
            <FilterItem
              name="equipment"
              value="AC"
              label="AC"
              multi
              variant="pill"
              iconId="wind"
              activeItems={tempFilters.equipment}
              onSelect={updateFilter}
            />

            <FilterItem
              name="equipment"
              value="kitchen"
              label="Kitchen"
              multi
              variant="pill"
              iconId="kitchen"
              activeItems={tempFilters.equipment}
              onSelect={updateFilter}
            />

            <FilterItem
              name="equipment"
              value="bathroom"
              label="Bathroom"
              multi
              variant="pill"
              iconId="shower"
              activeItems={tempFilters.equipment}
              onSelect={updateFilter}
            />

            <FilterItem
              name="equipment"
              value="TV"
              label="TV"
              multi
              variant="pill"
              iconId="tv"
              activeItems={tempFilters.equipment}
              onSelect={updateFilter}
            />

            <FilterItem
              name="equipment"
              value="radio"
              label="Radio"
              multi
              variant="pill"
              iconId="radio"
              activeItems={tempFilters.equipment}
              onSelect={updateFilter}
            />

            <FilterItem
              name="equipment"
              value="refrigerator"
              label="Refrigerator"
              multi
              variant="pill"
              iconId="fridge"
              activeItems={tempFilters.equipment}
              onSelect={updateFilter}
            />

            <FilterItem
              name="equipment"
              value="microwave"
              label="Microwave"
              multi
              variant="pill"
              iconId="microwave"
              activeItems={tempFilters.equipment}
              onSelect={updateFilter}
            />

            <FilterItem
              name="equipment"
              value="gas"
              label="Gas"
              multi
              variant="pill"
              iconId="gas"
              activeItems={tempFilters.equipment}
              onSelect={updateFilter}
            />
          </ul>
        </div>

        {/* Vehicle type */}
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

        {/* ACTION BUTTONS */}
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
