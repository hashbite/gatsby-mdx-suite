import React, { useState, useCallback } from 'react'
import propTypes from 'prop-types'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import {
  useKillScrollTriggerOnCleanup,
  useKillScrollTriggerWhenTrue,
} from '@gatsby-mdx-suite/helpers/styling/gsap'

import DefaultLoading from './loading'

gsap.registerPlugin(ScrollTrigger)

/**
 * Ensure children are not rendered till the user scrolls close by
 */
export default function LazyComponent({
  markers,
  children,
  loading = <DefaultLoading />,
  forceRendering = false,
}) {
  const [shouldRender, setShouldRender] = useState(forceRendering)
  const [scrollTriggerInstance, setScrollTriggerInstance] = useState(null)

  const initScrollTrigger = useCallback(
    (node) => {
      if (!node) {
        return
      }
      setScrollTriggerInstance(
        ScrollTrigger.create({
          trigger: node,
          markers,
          start: 'top 200%',
          end: 'bottom -100%',
          refreshPriority: 10,
          onToggle: ({ isActive }) => isActive && setShouldRender(true),
        })
      )
    },
    [markers]
  )

  useKillScrollTriggerOnCleanup(scrollTriggerInstance)
  useKillScrollTriggerWhenTrue(scrollTriggerInstance, shouldRender)

  return (
    <div ref={!forceRendering && initScrollTrigger}>
      {shouldRender || forceRendering ? children : loading}
    </div>
  )
}

LazyComponent.defaultProps = {
  markers: false,
}

LazyComponent.propTypes = {
  /** The children that should not be rendered till the user scrolls close */
  children: propTypes.node.isRequired,
  /** Overwrite the default loading component */
  loading: propTypes.node,
  /** Enable markers for debugging */
  markers: propTypes.bool,
  /** Do not listen for scroll position and force rendering. Useful for components that will get rendered above the fold. */
  forceRendering: propTypes.bool,
}
