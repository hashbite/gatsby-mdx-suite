import React, { useCallback, useState } from 'react'
import propTypes from 'prop-types'
import { cx } from 'emotion'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import useAnimation from '@gatsby-mdx-suite/helpers/styling/use-animation'
import { useKillScrollTrigger } from '@gatsby-mdx-suite/helpers/styling/gsap'

gsap.registerPlugin(ScrollTrigger)

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
const Animate = ({ children, markers, show, className, ...props }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollTriggerInstance, setScrollTriggerInstance] = useState(null)
  const { animationClass } = useAnimation({ show, isVisible })
  useKillScrollTrigger(scrollTriggerInstance)

  const initScrollTrigger = useCallback(
    (node) => {
      if (!node) {
        return
      }
      setScrollTriggerInstance(
        ScrollTrigger.create({
          trigger: node,
          start: 'top 62.8%',
          end: 'bottom top',
          markers,
          onToggle: ({ isActive }) => isActive && setIsVisible(true),
        })
      )
    },
    [setIsVisible, markers]
  )

  return (
    <div
      {...props}
      ref={initScrollTrigger}
      className={cx(animationClass, className)}
    >
      {children}
    </div>
  )
}

Animate.displayName = 'Animate'

Animate.defaultProps = {
  show: 'fadeIn 1s',
  markers: false,
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
  /**
   * Show trigger and scroll frame markers for debugging.
   */
  markers: propTypes.bool,
}

export default Animate
