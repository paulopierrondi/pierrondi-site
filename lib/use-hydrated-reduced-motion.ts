'use client'

import { useSyncExternalStore } from 'react'
import { useReducedMotion } from 'framer-motion'

const subscribe = () => () => undefined

/**
 * Keeps the server render and the first client render aligned, then applies
 * the visitor's motion preference immediately after hydration.
 */
export function useHydratedReducedMotion(): boolean {
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false)
  const prefersReducedMotion = useReducedMotion() ?? false

  return hydrated && prefersReducedMotion
}
