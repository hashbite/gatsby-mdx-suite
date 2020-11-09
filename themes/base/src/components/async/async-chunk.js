import React, { useState, useCallback, useEffect } from 'react'
import propTypes from 'prop-types'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import DefaultLoading from './loading'

gsap.registerPlugin(ScrollTrigger)

/**
 * Ensure a loadable component is delayed until the user scrolls close to it
 */
export default function AsyncChunk({
  markers,
  loadable,
  loading = <DefaultLoading />,
}) {
  const [scrollTrigger, setScrollTrigger] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [wrapperHeight, setWrapperHeight] = useState(null)

  const initScrollTrigger = useCallback(
    (node) => {
      if (!node) {
        return
      }
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: node,
        markers,
        end: 'bottom top',
        onToggle: ({ isActive }) => isActive && setShouldRender(true),
      })
      setScrollTrigger(scrollTriggerInstance)
      setWrapperHeight(node.clientHeight)
      return scrollTriggerInstance.kill
    },
    [markers]
  )

  // Remove Scroll trigger as soon chunk starts loading
  useEffect(() => {
    if (scrollTrigger && shouldRender) {
      scrollTrigger.kill()
      setScrollTrigger(null)
    }
  }, [scrollTrigger, shouldRender])

  const isSSR = typeof window === 'undefined'

  return shouldRender && !isSSR ? (
    <React.Suspense fallback={loading}>{loadable}</React.Suspense>
  ) : (
    <div ref={initScrollTrigger} style={{ minHeight: wrapperHeight }}>
      {loading}
    </div>
  )
}

AsyncChunk.defaultProps = {
  markers: false,
}

AsyncChunk.propTypes = {
  /** The component that should be loaded as soon the user scrolls close */
  loadable: propTypes.node.isRequired,
  /** Overwrite the loading component */
  loading: propTypes.node,
  /** Enable markers for debugging */
  markers: propTypes.bool,
}
