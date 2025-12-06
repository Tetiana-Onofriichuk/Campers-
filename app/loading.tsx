"use client";

import { PulseLoader } from "react-spinners";
import styles from "./loader.module.css";

export default function Loading() {
  return (
    <div className={styles.backdrop}>
      <div className={styles.center}>
        <PulseLoader color="#E44848" size={12} speedMultiplier={0.9} />
        <p className={styles.text}>Loading...</p>
      </div>
    </div>
  );
}
