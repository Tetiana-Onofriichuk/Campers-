"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { useFavoritesStore } from "@/store/favoritesStore";

export default function Header() {
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.navigation}>
          <Link href="/" className={css.logo}>
            <svg width={136} height={16} aria-hidden="true">
              <use href="/sprite.svg#icon-Logo" />
            </svg>
          </Link>

          <ul className={css.navigationList}>
            <li>
              <Link href="/" className={css.navigationLink}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/catalog" className={css.navigationLink}>
                Catalog
              </Link>
            </li>
          </ul>

          <Link href="/favorites" className={css.favoritesLink}>
            <svg className={css.heartIcon} aria-hidden="true">
              <use href="/sprite.svg#icon-heart" />
            </svg>

            {favorites.length > 0 && (
              <span className={css.badge}>{favorites.length}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
