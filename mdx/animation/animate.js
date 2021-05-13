import React, { useCallback, useState, useMemo } from 'react'
import propTypes from 'prop-types'
import { ClassNames } from '@emotion/react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import * as animations from 'gatsby-theme-mdx-suite-core/src/animations/index'
import {
  useKillScrollTriggerOnCleanup,
  useKillScrollTriggerWhenTrue,
} from '@gatsby-mdx-suite/helpers/styling/gsap'

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

  const initScrollTrigger = useCallback(
    (node) => {
      if (!node) {
        return
      }
      setScrollTriggerInstance(
        ScrollTrigger.create({
          trigger: node,
          start: 'top 61.8%',
          markers,
          onToggle: ({ isActive }) => isActive && setIsVisible(true),
        })
      )
    },
    [setIsVisible, markers]
  )

  useKillScrollTriggerOnCleanup(scrollTriggerInstance)
  useKillScrollTriggerWhenTrue(scrollTriggerInstance, isVisible)

  const { animation, animationProps } = useMemo(() => {
    if (typeof show !== 'string') {
      return {}
    }

    const [animationName, ...rawAnimationProps] = show.split(' ')
    const animation = animations[animationName]

    if (!animation) {
      throw new Error(`Unable to locate animation ${show}`)
    }

    const animationProps = rawAnimationProps
      ? rawAnimationProps.join(' ')
      : '1s'

    return { animation, animationProps }
  }, [show])

  return (
    <ClassNames>
      {({ cx, css }) => (
        <div
          {...props}
          ref={initScrollTrigger}
          className={cx(
            css`
              animation: ${animation.keyframes} ${animationProps};
              animation-fill-mode: both;
              animation-play-state: ${isVisible ? 'running' : 'paused'};
              will-change: transform, opacity;
              ${animation.styles};
            `,
            className
          )}
        >
          {children}
        </div>
      )}
    </ClassNames>
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
