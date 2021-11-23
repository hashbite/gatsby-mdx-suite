import React, { useEffect, useMemo, useState } from 'react'
import propTypes from 'prop-types'

import { useIntersection, useWindowSize } from 'react-use'

import DefaultLoading from './loading'

/**
 * Ensure children are not rendered till the user scrolls close by
 */
function LazyComponent({ children, Loading, forceRendering = false }) {
  const { height } = useWindowSize()
  const intersectionRef = React.useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: `${height}px 0px ${height}px 0px`,
    threshold: 1,
  })

  const shouldRender = useMemo(
    () => intersection && intersection.intersectionRatio,
    [intersection]
  )

  if (forceRendering) {
    return children
  }

  return <div ref={intersectionRef}>{shouldRender ? children : Loading}</div>
}

LazyComponent.defaultProps = {
  markers: false,
}

LazyComponent.propTypes = {
  /** The children that should not be rendered till the user scrolls close */
  children: propTypes.node.isRequired,
  /** Overwrite the default loading component */
  loading: propTypes.node,
  /** Do not listen for scroll position and force rendering. Useful for components that will get rendered above the fold. */
  forceRendering: propTypes.bool,
}

export default function LazyComponentSSR({
  Loading = DefaultLoading,
  forceRendering = false,
  ...props
}) {
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  return isSSR || forceRendering ? (
    <Loading />
  ) : (
    <LazyComponent
      {...props}
      Loading={Loading}
      forceRendering={forceRendering}
    />
  )
}

LazyComponentSSR.propTypes = LazyComponent.propTypes
