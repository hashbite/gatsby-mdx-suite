import React from 'react'
import propTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

const GridWrapper = styled.div(
  ({ minWidth, maxWidth, center, theme }) => css`
    margin: ${theme.spacing.s4}px 0;

    /* ensure full width when within viewport/flex box container */
    width: 100%;

    /* Fallback grid based on flexbox */
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;

    & > * {
      flex: 0 0 auto;
    }

    /* Actual grid */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(${minWidth}, ${maxWidth}));
    grid-gap: ${theme.spacing.s2}px;

    /* Ensure all images are responsive within the grid. */
    img,
    svg,
    video {
      width: 100%;
      height: auto;
    }

    /* Center items */
    ${center &&
      css`
        align-items: center;
        justify-content: center;
      `}
  `
)

const GridItem = styled.div(
  ({ center }) => css`
    ${center &&
      css`
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        > * {
          width: 100%;

          > * {
            margin: 0 auto;
          }
        }
      `}
  `
)

/**
 * Renders a grid with a dynamic number of columns.
 *
 * The column width and count depends on a given minimum and maximum column width.
 */
export default function Grid({ children, ...props }) {
  if (!children || !children.length) {
    return null
  }

  if (!Array.isArray(children)) {
    children = [children]
  }

  children = children.map((child, i) => (
    <GridItem key={i} center={props.center}>
      {child}
    </GridItem>
  ))

  return <GridWrapper {...props}>{children}</GridWrapper>
}

Grid.displayName = 'Grid'

Grid.defaultProps = {
  minWidth: '280px',
  maxWidth: '1fr',
}

Grid.propTypes = {
  /** Minimum width for every grid column. Defaults to 280px */
  minWidth: propTypes.string,
  /** Maximum width for every grid column */
  maxWidth: propTypes.string,
  /** Horizontally center grid items */
  center: propTypes.bool,
  children: propTypes.node.isRequired,
}
