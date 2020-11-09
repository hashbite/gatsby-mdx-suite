import React, { useState, useCallback, useEffect } from 'react'
import propTypes from 'prop-types'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
  const [scrollTrigger, setScrollTrigger] = useState(false)
  const [shouldRender, setShouldRender] = useState(forceRendering)
  const [wrapperHeight, setWrapperHeight] = useState(null)

  const initScrollTrigger = useCallback(
    (node) => {
      // Do not init when rendering is forced or wrapper is not yet mounted.
      if (!node || forceRendering) {
        return
      }
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: node,
        markers,
        start: 'top 120%',
        end: 'bottom top',
        onToggle: ({ isActive }) => isActive && setShouldRender(true),
      })
      setScrollTrigger(scrollTriggerInstance)
      setWrapperHeight(node.clientHeight)
      return scrollTriggerInstance.kill
    },
    [markers, forceRendering]
  )

  // Remove Scroll trigger as soon chunk starts loading
  useEffect(() => {
    if (scrollTrigger && shouldRender) {
      scrollTrigger.kill()
      setScrollTrigger(null)
    }
  }, [scrollTrigger, shouldRender])

  return shouldRender ? (
    children
  ) : (
    <div ref={initScrollTrigger} style={{ minHeight: wrapperHeight }}>
      {loading}
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
