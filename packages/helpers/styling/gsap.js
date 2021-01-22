import { useLayoutEffect } from 'react'

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
export function useKillScrollTrigger(scrollTriggerInstance) {
  useLayoutEffect(
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
