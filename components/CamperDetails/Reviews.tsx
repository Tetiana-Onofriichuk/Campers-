import css from "./Reviews.module.css";

export type CamperReview = {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
};

type Props = {
  reviews: CamperReview[];
};

export default function Reviews({ reviews }: Props) {
  if (!reviews?.length) {
    return <p className={css.noReviews}>There are no reviews yet.</p>;
  }

  return (
    <div className={css.box}>
      <ul className={css.reviewsList}>
        {reviews.map((rev, idx) => (
          <li key={idx} className={css.reviewItem}>
            <div className={css.reviewHeader}>
              <div className={css.avatar}>
                {rev.reviewer_name[0]?.toUpperCase()}
              </div>

              <div>
                <p className={css.reviewerName}>{rev.reviewer_name}</p>

                <div className={css.starRow}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      aria-hidden="true"
                      className={`${css.starIcon} ${
                        i < rev.reviewer_rating ? css.starActive : ""
                      }`}
                    >
                      <use href="sprite.svg#icon-rating" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            <p className={css.reviewText}>{rev.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
