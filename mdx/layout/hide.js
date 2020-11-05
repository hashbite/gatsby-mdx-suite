import React, { useMemo } from 'react'
import propTypes from 'prop-types'
import { useBreakpoint } from '@gatsby-mdx-suite/helpers/hooks/use-breakpoint'

/**
 * Hide one component on given conditions.
 *
 * You may:
 *
 * * Hide something as long we are within a given screen size (till)
 * * Hide something as soon we reach a given screen size (from)
 *
 *
 * @example
 *
 * # I am always visible
 *
 * <Hide till="sm">
 *
 * ## I'll be hidden on very small screens, becoming visible at sm screen size.
 *
 * </Hide>
 * <Hide from="lg">
 *
 * ## I'll be visible till we reach lg and xl screen sizes.
 *
 * </Hide>
 */
const Hide = ({ children, till, from, ...props }) => {
  const activeBreakpoints = useBreakpoint()

  const styledChild = useMemo(() => {
    const style = {}
    if (till && !activeBreakpoints[till]) {
      style.display = 'none'
    }
    if (from && activeBreakpoints[from]) {
      style.display = 'none'
    }
    return React.cloneElement(children, {
      style,
    })
  }, [children, from, till, activeBreakpoints])

  return <>{styledChild}</>
}

Hide.displayName = 'Hide'

Hide.defaultProps = {}

Hide.propTypes = {
  /** The component that should be hidden */
  children: propTypes.element.isRequired,
  /** Hide the component till given screen size is reached */
  till: propTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  /** Hide the component as soon given screen size is reached */
  from: propTypes.oneOf(['sm', 'md', 'lg', 'xl']),
}

export default Hide
