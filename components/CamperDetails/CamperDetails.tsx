"use client";

import { useState } from "react";
import Image from "next/image";
import type { Camper } from "@/types/camper";
import Description from "./Description";
import Reviews from "./Reviews";
import BookingForm from "../BookingForm/BookingForm";
import css from "./CamperDetails.module.css";

type Props = {
  camper: Camper;
};

type Tab = "features" | "reviews";

export default function CamperDetails({ camper }: Props) {
  const {
    name,
    price,
    rating,
    location,
    gallery,
    description,
    reviews = [],
  } = camper;

  const [activeTab, setActiveTab] = useState<Tab>("features");

  const mainImage =
    gallery?.[0]?.original || gallery?.[0]?.thumb || "/image/hero.webp";

  const reviewsCount = camper.reviews?.length ?? 0;
  return (
    <div className="container">
      <div className={css.headerContainer}>
        <h1 className={css.title}>{name}</h1>

        <div className={css.metaRow}>
          <span className={css.rating}>
            <svg className={css.starIcon} aria-hidden="true">
              <use href="sprite.svg#icon-rating" />
            </svg>

            <span className={css.ratingText}>
              {rating.toFixed(1)} ({reviewsCount} reviews)
            </span>
          </span>
          <span className={css.location}>
            <svg className={css.locationIcon} aria-hidden="true">
              <use href="sprite.svg#icon-location" />
            </svg>
            {location}
          </span>
        </div>

        <p className={css.price}>€{price}.00</p>
      </div>

      <div className={css.gallery}>
        {gallery?.slice(0, 3).map((img, idx) => (
          <div key={idx} className={css.galleryItem}>
            <Image
              src={img.original || img.thumb || mainImage}
              alt={name}
              fill
              sizes="(min-width: 1024px) 292px, 33vw"
              className={css.galleryImg}
            />
          </div>
        ))}
      </div>

      <p className={css.descriptionTop}>{description}</p>

      <div className={css.tabs}>
        <button
          type="button"
          className={`${css.tabBtn} ${
            activeTab === "features" ? css.tabBtnActive : ""
          }`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          type="button"
          className={`${css.tabBtn} ${
            activeTab === "reviews" ? css.tabBtnActive : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={css.contentRow}>
        <div className={css.leftCol}>
          {activeTab === "features" ? (
            <Description camper={camper} />
          ) : (
            <Reviews reviews={reviews} rating={rating} />
          )}
        </div>

        <div className={css.rightCol}>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
