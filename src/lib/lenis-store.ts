/**
 * Module-level singleton that holds the active Lenis instance.
 * SmoothScrollProvider registers/unregisters the instance here so that
 * other components (e.g. NavigationDots) can call lenis.scrollTo()
 * without needing React context or prop drilling.
 */
import type Lenis from 'lenis'

let instance: Lenis | null = null

export const lenisStore = {
  set: (lenis: Lenis | null) => {
    instance = lenis
  },
  get: () => instance,
}
