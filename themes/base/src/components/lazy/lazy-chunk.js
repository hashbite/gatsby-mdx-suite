import React from 'react'
import propTypes from 'prop-types'

import LazyComponent from './lazy-component'
import DefaultLoading from './loading'

/**
 * Ensure a loadable component is delayed until the user scrolls close to it
 */
export default function LazyChunk({ children, loading = <DefaultLoading /> }) {
  const isSSR = typeof window === 'undefined'

  return (
    <LazyComponent>
      {!isSSR && <React.Suspense fallback={loading}>{children}</React.Suspense>}
    </LazyComponent>
  )
}

LazyChunk.defaultProps = {
  markers: false,
}

LazyChunk.propTypes = {
  /** The component chunk that should be loaded as soon the user scrolls close */
  children: propTypes.node.isRequired,
  /** Overwrite the loading component */
  loading: propTypes.node,
}
