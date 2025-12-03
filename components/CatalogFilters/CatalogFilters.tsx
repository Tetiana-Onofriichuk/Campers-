// components/CatalogFilters/CatalogFilters.tsx
"use client";

import { FormEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterItem from "@/components/Filters/FilterItem";
import css from "./CatalogFilters.module.css";

export default function CatalogFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  // початкове значення беремо з URL, щоб все було синхронно
  const [locationInput, setLocationInput] = useState(sp.get("location") ?? "");

  const updateSearchParams = (next: URLSearchParams) => {
    const href = `${pathname}${next.toString() ? "?" + next.toString() : ""}`;
    router.push(href);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const next = new URLSearchParams(sp.toString());

    if (locationInput.trim()) {
      next.set("location", locationInput.trim());
    } else {
      next.delete("location");
    }

    // нові фільтри → завжди з першої сторінки
    next.delete("page");

    updateSearchParams(next);
  };

  return (
    <aside className={css.filters}>
      <form onSubmit={handleSubmit} className={css.form}>
        {/* Location */}
        <div className={css.block}>
          <p className={css.label}>Location</p>
          <div className={css.locationWrapper}>
            {/* тут можна вставити іконку, якщо захочеш */}
            <input
              className={css.locationInput}
              type="text"
              placeholder="Kyiv, Ukraine"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
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
            />
            <FilterItem
              name="equipment"
              value="kitchen"
              label="Kitchen"
              multi
              variant="pill"
            />
            <FilterItem
              name="equipment"
              value="bathroom"
              label="Bathroom"
              multi
              variant="pill"
            />
            <FilterItem
              name="equipment"
              value="TV"
              label="TV"
              multi
              variant="pill"
            />
            <FilterItem
              name="equipment"
              value="radio"
              label="Radio"
              multi
              variant="pill"
            />
            <FilterItem
              name="equipment"
              value="refrigerator"
              label="Refrigerator"
              multi
              variant="pill"
            />
            <FilterItem
              name="equipment"
              value="microwave"
              label="Microwave"
              multi
              variant="pill"
            />
            <FilterItem
              name="equipment"
              value="gas"
              label="Gas"
              multi
              variant="pill"
            />
            <FilterItem
              name="equipment"
              value="water"
              label="Water"
              multi
              variant="pill"
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
            />
            <FilterItem
              name="form"
              value="fullyIntegrated"
              label="Fully integrated"
              variant="pill"
            />
            <FilterItem
              name="form"
              value="alcove"
              label="Alcove"
              variant="pill"
            />
          </ul>
        </div>

        <button type="submit" className={css.searchBtn}>
          Search
        </button>
      </form>
    </aside>
  );
}
