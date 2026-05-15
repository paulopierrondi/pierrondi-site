"use client"

import { useEffect } from "react"

/**
 * Attaches an IntersectionObserver to all elements with a [data-animate] attribute.
 * When an element enters the viewport, the class `revealed` is added to it (once only).
 *
 * Pair with `app/animations.css` for the actual transition styles.
 *
 * Call once at page level or in a layout component.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    )

    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
