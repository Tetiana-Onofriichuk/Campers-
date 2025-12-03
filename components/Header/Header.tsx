import Link from "next/link";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.navigation}>
          <Link href="/" className={css.logo}>
            <svg width={136} height={16}>
              <use href="/icons.svg#icon-Logo"></use>
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
        </div>
      </div>
    </header>
  );
}
