import React from 'react'
import propTypes from 'prop-types'

import LazyComponent from './lazy-component'
import DefaultLoading from './loading'

/**
 * Ensure a loadable component is delayed until the user scrolls close to it
 */
export default function LazyChunk({
  children,
  loading = <DefaultLoading />,
  ...props
}) {
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <LazyComponent {...props} />
  }

  return (
    <LazyComponent {...props}>
      <React.Suspense fallback={loading}>{children}</React.Suspense>
    </LazyComponent>
  )
}

LazyChunk.propTypes = {
  /** The component chunk that should be loaded as soon the user scrolls close */
  children: propTypes.node.isRequired,
  /** Overwrite the loading component */
  loading: propTypes.node,
}
