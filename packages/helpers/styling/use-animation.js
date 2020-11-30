import { css } from '@emotion/css'
import * as animations from 'gatsby-theme-mdx-suite-core/src/animations/index'

const useAnimation = ({ show, isVisible }) => {
  if (typeof show !== 'string') {
    return {}
  }

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

  return {
    animationClass,
  }
}

export default useAnimation
