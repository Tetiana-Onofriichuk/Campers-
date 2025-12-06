"use client";

import { useEffect, useRef, useState } from "react";
import css from "./ScrollUp.module.css";

const SCROLL_THRESHOLD = 200;

export default function ScrollUp() {
  const [visible, setVisible] = useState(false);
  const lastScrollableRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement | Document;
      const scrollingElement =
        document.scrollingElement || document.documentElement;

      let yRoot = scrollingElement ? scrollingElement.scrollTop : 0;
      let yTarget = 0;

      if (target instanceof HTMLElement) {
        if (target.scrollHeight > target.clientHeight + 4) {
          yTarget = target.scrollTop;
          lastScrollableRef.current = target;
        }
      }

      const y = Math.max(yRoot, yTarget);
      setVisible(y > SCROLL_THRESHOLD);
    };

    document.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });
    handleScroll(new Event("scroll"));

    return () => {
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  const handleClick = () => {
    const scrollingElement =
      document.scrollingElement || document.documentElement;

    if (scrollingElement) {
      scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (lastScrollableRef.current) {
      lastScrollableRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`${css.scroller} ${visible ? css.scrollerVisible : ""}`}
    >
      <svg className={css.scrollSvg} width="40" height="40" aria-hidden="true">
        <use href="/sprite.svg#icon-arrow-up" />
      </svg>
    </button>
  );
}
