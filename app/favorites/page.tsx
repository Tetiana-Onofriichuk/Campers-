"use client";

import { useFavoritesStore } from "@/store/favoritesStore";
import CamperCard from "@/components/CamperCard/CamperCard";
import styles from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);

  const hasFavorites = favorites.length > 0;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Favorites</h1>

        {!hasFavorites && (
          <p className={styles.empty}>
            You don&apos;t have any favorite campers yet.
          </p>
        )}

        {hasFavorites && (
          <ul className={styles.list}>
            {favorites.map((camper) => (
              <li key={camper.id} className={styles.item}>
                <CamperCard camper={camper} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
