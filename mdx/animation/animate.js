import React, { useMemo, useRef } from 'react'
import propTypes from 'prop-types'
import { cx } from '@emotion/css'
import { useIntersection } from 'react-use'

import useAnimation from '@gatsby-mdx-suite/helpers/styling/use-animation'

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
const Animate = ({ children, show, className, ...props }) => {
  const wrapperRef = useRef(null)

  const intersection = useIntersection(wrapperRef, {
    rootMargin: `-25% 0px -25% 0px`,
    threshold: 0.1,
  })

  const isVisible = useMemo(
    () => intersection && intersection.isIntersecting,
    [intersection]
  )

  const { animationClass } = useAnimation({ show, isVisible })

  return (
    <div ref={wrapperRef}>
      <div {...props} className={cx(animationClass, className)}>
        {children}
      </div>
    </div>
  )
}

Animate.displayName = 'Animate'

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
