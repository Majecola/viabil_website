"use client";

import { useEffect } from "react";

/**
 * Adds `.is-in` to every `.v1-rise` element as it enters the viewport.
 * One observer for the whole one-page landing — cheaper than a wrapper
 * component per section. Respects prefers-reduced-motion.
 */
export function V1Reveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      document
        .querySelectorAll<HTMLElement>(".v1-rise")
        .forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    const observePending = () => {
      document
        .querySelectorAll<HTMLElement>(".v1-rise:not(.is-in)")
        .forEach((el) => observer.observe(el));
    };

    observePending();

    // Sections that mount after hydration (lazy media, client-only widgets).
    const rescan = window.setTimeout(observePending, 600);

    // Failsafe: anything sitting in the viewport that the observer never
    // reported gets revealed anyway — better than a blank stretch of page.
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".v1-rise:not(.is-in)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add("is-in");
      });
    }, 4000);

    return () => {
      window.clearTimeout(rescan);
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return null;
}
