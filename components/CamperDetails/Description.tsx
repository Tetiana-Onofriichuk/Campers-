import type { Camper } from "@/types/camper";
import css from "./Description.module.css";

type Props = {
  camper: Camper;
};

export default function Description({ camper }: Props) {
  const {
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
    form,
    length,
    width,
    height,
    tank,
    consumption,
  } = camper;

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
    <div className={css.box}>
      <ul className={css.badges}>
        {featureBadges.map((badge) => (
          <li key={badge.id} className={css.badge}>
            <svg className={css.badgeIcon} aria-hidden="true">
              <use href={`sprite.svg#${badge.iconId}`} />
            </svg>
            <span>{badge.label}</span>
          </li>
        ))}
      </ul>

      <div className={css.detailsBlock}>
        <h3 className={css.detailsTitle}>Vehicle details</h3>

        <ul className={css.detailsList}>
          <li className={css.detailsItem}>
            <span>Form</span>
            <span>{form}</span>
          </li>
          <li className={css.detailsItem}>
            <span>Length</span>
            <span>{length} m</span>
          </li>
          <li className={css.detailsItem}>
            <span>Width</span>
            <span>{width} m</span>
          </li>
          <li className={css.detailsItem}>
            <span>Height</span>
            <span>{height} m</span>
          </li>
          <li className={css.detailsItem}>
            <span>Tank</span>
            <span>{tank} l</span>
          </li>
          <li className={css.detailsItem}>
            <span>Consumption</span>
            <span>{consumption}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function capitalize(value: string) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}
