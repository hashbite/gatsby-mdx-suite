import React, { useCallback, useState, useMemo, useEffect } from 'react'
import propTypes from 'prop-types'
import { cx } from 'emotion'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import useAnimation from '@gatsby-mdx-suite/helpers/styling/use-animation'

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
const Animate = ({ children, markers, show }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollTriggerInstance, setScrollTriggerInstance] = useState(null)
  const { animationClass } = useAnimation({ show, isVisible })

  useEffect(
    function cleanUpScrollTrigger() {
      if (scrollTriggerInstance && isVisible) {
        scrollTriggerInstance.kill()
        setScrollTriggerInstance(null)
      }
    },
    [scrollTriggerInstance, isVisible]
  )

  const initScrollTrigger = useCallback(
    (node) => {
      if (!node) {
        return
      }
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: node,
        start: 'top 62.8%',
        end: 'bottom top',
        markers,
        onToggle: ({ isActive }) => isActive && setIsVisible(true),
      })
      setScrollTriggerInstance(scrollTriggerInstance)
      return scrollTriggerInstance?.kill
    },
    [setIsVisible, markers]
  )

  const node = useMemo(() => {
    const count = React.Children.count(children)

    let wrappedChildren = children

    if (
      typeof children === 'string' ||
      !count ||
      count > 1 ||
      typeof children?.type?.render === 'function'
    ) {
      wrappedChildren = <div>{children}</div>
    }

    return React.cloneElement(wrappedChildren, {
      className: cx(animationClass),
      ref: initScrollTrigger,
    })
  }, [children, animationClass, initScrollTrigger])

  return node
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
