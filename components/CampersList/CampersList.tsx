"use client";

import { useCampersStore } from "@/store/campersStore";
import CamperCard from "@/components/CamperCard/CamperCard";
import css from "./CampersList.module.css";

export default function CampersList() {
  const { campers, total, isLoading, loadMore } = useCampersStore();

  const hasMore = campers.length < total;

  return (
    <div className={css.wrapper}>
      {isLoading && campers.length === 0 && (
        <p className={css.loader}>Loading...</p>
      )}

      {!isLoading && campers.length === 0 && (
        <p className={css.empty}>No campers found</p>
      )}

      <ul className={css.list}>
        {campers.map((camper) => (
          <li key={camper.id} className={css.item}>
            <CamperCard camper={camper} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          className={css.loadMore}
          disabled={isLoading}
          onClick={() =>
            loadMore(/* filters ми вже передаємо у store, як ти реалізувала */)
          }
        >
          {isLoading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
