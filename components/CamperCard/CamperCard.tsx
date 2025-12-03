"use client";

import Image from "next/image";
import Link from "next/link";
import type { Camper } from "@/types/camper";
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

  return (
    <article className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={mainImage}
          alt={name}
          width={290}
          height={310}
          className={css.image}
        />
      </div>

      <div className={css.content}>
        {/* верхній рядок: назва + ціна */}
        <div className={css.headerRow}>
          <h2 className={css.title}>{name}</h2>
          <span className={css.price}>€{priceFormatted}</span>
        </div>

        {/* рейтинг + локація */}
        <div className={css.metaRow}>
          <span className={css.rating}>
            <span className={css.star}>★</span>
            {rating.toFixed(1)}{" "}
            {reviewsCount > 0 && (
              <span className={css.reviews}>({reviewsCount} reviews)</span>
            )}
          </span>
          <span className={css.location}>📍 {location}</span>
        </div>

        {/* опис (трохи обрізаний) */}
        <p className={css.description}>{description}</p>

        {/* бейджі з характеристиками */}
        <ul className={css.badges}>
          {transmission && (
            <li className={css.badge}>{capitalize(transmission)}</li>
          )}
          {engine && <li className={css.badge}>{capitalize(engine)}</li>}
          {kitchen && <li className={css.badge}>Kitchen</li>}
          {AC && <li className={css.badge}>AC</li>}
          {bathroom && <li className={css.badge}>Bathroom</li>}
          {TV && <li className={css.badge}>TV</li>}
          {radio && <li className={css.badge}>Radio</li>}
          {refrigerator && <li className={css.badge}>Refrigerator</li>}
          {microwave && <li className={css.badge}>Microwave</li>}
          {gas && <li className={css.badge}>Gas</li>}
          {water && <li className={css.badge}>Water</li>}
        </ul>

        {/* кнопка Show more */}
        <div className={css.footer}>
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
