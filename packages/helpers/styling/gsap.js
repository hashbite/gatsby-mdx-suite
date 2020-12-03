import { useEffect } from 'react'

// This helper kills the time line and the attached ScrollTrigger instance
export function killScrollTrigger(instance) {
  if (!instance) {
    return
  }
  if (instance.scrollTrigger) {
    instance.scrollTrigger.kill(true)
  }
  instance.kill()
  console.log('he is dead')
}

// Hook to kill ScrollTrigger instances automatically
export function useKillScrollTrigger(scrollTriggerInstance) {
  useEffect(() => () => {
    if (Array.isArray(scrollTriggerInstance)) {
      console.log('array kill')
      return scrollTriggerInstance.map(killScrollTrigger)
    }
    killScrollTrigger(scrollTriggerInstance)
  })
}
