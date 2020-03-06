import React from 'react'
import propTypes from 'prop-types'
import { cx } from 'emotion'
import styled from '@emotion/styled'
import Observer from '@researchgate/react-intersection-observer'

import useAnimation from '@gatsby-mdx-suite/helpers/styling/use-animation'

const ObserverWrapper = styled.div``
const AnimationWrapper = styled.div``

/**
 * Animate one or more elements.
 *
 * @example
 * <Section>
 * <Animate>
 *
 * # Default
 *
 * </Animate>
 * <Animate show="fadeInLeftBig 1s">
 *
 * # Left example
 *
 * </Animate>
 * <Animate show="fadeInRightBig 1s 0.5s">
 *
 * # Right example
 *
 * </Animate>
 * </Section>
 */
const Animate = ({ children, show }) => {
  const { animationClass, animationObserverProps } = useAnimation({ show })

  return (
    <ObserverWrapper>
      <Observer {...animationObserverProps}>
        <div>
          <AnimationWrapper className={cx(animationClass)}>
            {children}
          </AnimationWrapper>
        </div>
      </Observer>
    </ObserverWrapper>
  )
}

Animate.defaultProps = {
  show: 'fadeIn 1s',
}

Animate.propTypes = {
  children: propTypes.node.isRequired,
  /**
   * Define a animation that is played once as soon the user sees the wrapping element
   *
   * Basic example: `fadeIn 1s`
   * Available keyframe animations: https://daneden.github.io/animate.css/
   *
   * Full animation syntax is supported: https://developer.mozilla.org/en-US/docs/Web/CSS/animation
   */
  show: propTypes.string,
}

export default Animate
