import React, { useMemo } from 'react'
import propTypes from 'prop-types'
import { useBreakpoint } from '@gatsby-mdx-suite/helpers/hooks/use-breakpoint'
import { css } from '@emotion/core'

/**
 * Offset one component on given conditions.
 *
 * You may:
 *
 * * Offset something as long we are within a given screen size (till)
 * * Offset something as soon we reach a given screen size (from)
 */
const Offset = ({ children, till, from, x, y, ...props }) => {
  const activeBreakpoints = useBreakpoint()

  const offset = css`
    transform: translateX(${x}) translateY(${y});
  `

  const styledChild = useMemo(() => {
    if (
      (!till && !from) ||
      (till && !activeBreakpoints[till]) ||
      (from && activeBreakpoints[from])
    ) {
      return (
        <div css={offset} {...props}>
          {children}
        </div>
      )
    }
    return children
  }, [children, from, till, activeBreakpoints, offset, props])

  return <>{styledChild}</>
}

Offset.displayName = 'Offset'

Offset.defaultProps = {
  x: '0',
  y: '0',
}

Offset.propTypes = {
  children: propTypes.element.isRequired,
  /** X-axis offset */
  x: propTypes.string,
  /** Y-axis offset */
  y: propTypes.string,
  /** Offset the component till given screen size is reached */
  till: propTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  /** Offset the component as soon given screen size is reached */
  from: propTypes.oneOf(['sm', 'md', 'lg', 'xl']),
}

export default Offset
