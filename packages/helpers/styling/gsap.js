import { useLayoutEffect, useEffect } from 'react'

/**
 * As we use useLayoutEffect only for cleanup, this work around prevents
 * warnings about using useLayoutEffect in SSR environment.
 *
 * See: https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

// This helper kills the time line and the attached ScrollTrigger instance
export function killScrollTrigger(instance) {
  if (!instance) {
    return
  }
  if (instance.scrollTrigger) {
    killScrollTrigger(instance.scrollTrigger)
  }
  if (typeof instance.disable === 'function') {
    instance.disable(true)
  }
  if (typeof instance.clear === 'function') {
    instance.clear()
  }
  instance.kill(true)
}

// Hook to kill ScrollTrigger instances automatically
export function useKillScrollTriggerOnCleanup(scrollTriggerInstance) {
  useIsomorphicLayoutEffect(
    () => () => {
      if (!scrollTriggerInstance) {
        return null
      }
      if (Array.isArray(scrollTriggerInstance)) {
        return scrollTriggerInstance.map(killScrollTrigger)
      }
      killScrollTrigger(scrollTriggerInstance)
    },
    [scrollTriggerInstance]
  )
}

export function useKillScrollTriggerWhenTrue(scrollTriggerInstance, condition) {
  useEffect(() => {
    if (condition) {
      killScrollTrigger(scrollTriggerInstance)
    }
  }, [condition, scrollTriggerInstance])
}
