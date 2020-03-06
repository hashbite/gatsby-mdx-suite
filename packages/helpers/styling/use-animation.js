import { useState } from 'react'
import { css } from 'emotion'
import * as animations from './animations'

const useAnimation = ({ show }) => {
  if (typeof show !== 'string') {
    return {}
  }
  const [isVisible, setIsVisible] = useState(false)

  const animationName = show.split(' ').find((fragment) => animations[fragment])

  let additionalStyles
  if (animationName) {
    show = show.replace(animationName, animations[animationName].keyframes)
    additionalStyles = animations[animationName].styles
  }

  const animationClass = css`
    animation: ${show};
    ${additionalStyles};
    animation-fill-mode: both;
    animation-play-state: ${isVisible ? 'running' : 'paused'};
  `

  const handleIntersection = (e) => {
    if (e.isIntersecting && !isVisible) {
      setIsVisible(true)
    }
  }

  const animationObserverProps = {
    threshold: 1,
    onChange: handleIntersection,
    rootMargin: '-12% 0px -12% 0px',
  }

  return {
    animationClass,
    animationObserverProps,
  }
}

export default useAnimation
