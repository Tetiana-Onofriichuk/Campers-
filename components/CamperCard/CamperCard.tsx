"use client";

import Image from "next/image";
import Link from "next/link";
import type { Camper } from "@/types/camper";
import { useFavoritesStore } from "@/store/favoritesStore";
import css from "./CamperCard.module.css";

type Props = {
  camper: Camper;
};

export default function CamperCard({ camper }: Props) {
  const {
    id,
    name,
    price,
    location,
    rating,
    gallery,
    description,
    AC,
    bathroom,
    kitchen,
    TV,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
    engine,
    transmission,
  } = camper;

  const mainImage =
    gallery?.[0]?.thumb || gallery?.[0]?.original || "/image/hero.webp";

  const priceFormatted = `${price}.00`;
  const reviewsCount = camper.reviews?.length ?? 0;

  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(String(id));

  const featureBadges = [
    transmission && {
      id: "transmission",
      label: capitalize(transmission),
      iconId: "icon-bi_grid-1x2",
    },
    engine && {
      id: "engine",
      label: capitalize(engine),
      iconId: "icon-fuel-pump",
    },
    kitchen && {
      id: "kitchen",
      label: "Kitchen",
      iconId: "icon-kitchen",
    },
    AC && {
      id: "ac",
      label: "AC",
      iconId: "icon-wind",
    },
    bathroom && {
      id: "bathroom",
      label: "Bathroom",
      iconId: "icon-shower",
    },
    TV && {
      id: "tv",
      label: "TV",
      iconId: "icon-tv",
    },
    radio && {
      id: "radio",
      label: "Radio",
      iconId: "icon-radio",
    },
    refrigerator && {
      id: "fridge",
      label: "Refrigerator",
      iconId: "icon-fridge",
    },
    microwave && {
      id: "microwave",
      label: "Microwave",
      iconId: "icon-microwave",
    },
    gas && {
      id: "gas",
      label: "Gas",
      iconId: "icon-gas",
    },
    water && {
      id: "water",
      label: "Water",
      iconId: "icon-diagram",
    },
  ].filter(Boolean) as { id: string; label: string; iconId: string }[];

  return (
    <article className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={mainImage}
          alt={name}
          width={292}
          height={320}
          className={css.image}
        />
      </div>

      <div className={css.content}>
        <div className={css.headerRow}>
          <h2 className={css.title}>{name}</h2>

          <div className={css.priceWrapper}>
            <span className={css.price}>€{priceFormatted}</span>

            <button
              type="button"
              className={`${css.favoriteBtn} ${
                favorite ? css.favoriteBtnActive : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(String(id));
              }}
              aria-label={
                favorite
                  ? "Remove camper from favorites"
                  : "Add camper to favorites"
              }
            >
              <svg className={css.favoriteIcon} aria-hidden="true">
                <use href="/sprite.svg#icon-heart" />
              </svg>
            </button>
          </div>
        </div>

        <div className={css.metaRow}>
          <span className={css.rating}>
            <svg className={css.starIcon} aria-hidden="true">
              <use href="/sprite.svg#icon-rating" />
            </svg>
            {rating.toFixed(1)}{" "}
            {reviewsCount > 0 && (
              <span className={css.reviews}>({reviewsCount} reviews)</span>
            )}
          </span>

          <span className={css.location}>
            <svg className={css.locationIcon} aria-hidden="true">
              <use href="/sprite.svg#icon-location" />
            </svg>
            {location}
          </span>
        </div>

        <p className={css.description}>{description}</p>

        <ul className={css.badges}>
          {featureBadges.map((badge) => (
            <li key={badge.id} className={css.badge}>
              <svg className={css.badgeIcon} aria-hidden="true">
                <use href={`/sprite.svg#${badge.iconId}`} />
              </svg>
              <span>{badge.label}</span>
            </li>
          ))}
        </ul>

        <div className={css.containerBtn}>
          <Link href={`/catalog/${id}`} className={css.showMore}>
            Show more
          </Link>
        </div>
      </div>
    </article>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
