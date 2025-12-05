"use client";

import css from "./FilterItem.module.css";

type FilterName = "equipment" | "form";

type FilterItemProps = {
  name: FilterName;
  value: string;
  label: string;
  iconId?: string;
  multi?: boolean;
  hideInput?: boolean;
  variant?: "default" | "pill";

  // нове – керування ззовні
  activeItems?: string[]; // для multi = true (equipment)
  activeItem?: string; // для single (form)
  onSelect?: (name: FilterName, value: string, multi: boolean) => void;
};

export default function FilterItem({
  name,
  value,
  label,
  iconId,
  multi = false,
  hideInput = false,
  variant = "default",
  activeItems,
  activeItem,
  onSelect,
}: FilterItemProps) {
  const isActive = multi ? activeItems?.includes(value) : activeItem === value;

  const handleClick = () => {
    if (onSelect) {
      onSelect(name, value, multi);
    }
  };

  const classes = [
    css.pill,
    variant === "pill" ? css.pillVariant : "",
    isActive ? css.active : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={css.item}>
      <button type="button" className={classes} onClick={handleClick}>
        {iconId && (
          <span className={css.icon}>
            <svg width="32" height="32" aria-hidden="true">
              <use href={`/sprite.svg#icon-${iconId}`} />
            </svg>
          </span>
        )}

        {!hideInput && <span className={css.text}>{label}</span>}
      </button>
    </li>
  );
}
