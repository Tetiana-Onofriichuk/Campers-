"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useCampersStore } from "@/store/campersStore";
import { buildFiltersFromSearchParams } from "@/utils/getFiltersFromParams";
import CatalogFilters from "@/components/CatalogFilters/CatalogFilters";
import CampersList from "@/components/CampersList/CampersList"; // зробиш/додаси пізніше
import css from "./Catalog.module.css";

export default function CatalogPage() {
  const sp = useSearchParams();

  // перетворюємо URL → CamperFilters
  const filters = useMemo(() => buildFiltersFromSearchParams(sp), [sp]);

  const { loadFirstPage } = useCampersStore();

  // Кожна зміна фільтрів в URL = новий запит на бекенд
  useEffect(() => {
    loadFirstPage(filters);
  }, [filters, loadFirstPage]);

  return (
    <main className={css.catalog}>
      <div className="container">
        <h1 className={css.title}>Catalog</h1>

        <div className={css.layout}>
          <CatalogFilters />
          {/* Поки що можна заглушку, якщо CampersList ще не готовий */}
          <CampersList />
        </div>
      </div>
    </main>
  );
}
