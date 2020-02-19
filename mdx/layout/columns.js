import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const StyledColumns = styled.div(
  ({
    theme: {
      spacing,
      sizes: { gridGutter },
      breakpoints,
    },
  }) => css`
    display: grid;
    grid-gap: ${gridGutter || 16}px;
    margin: ${spacing.s4}px 0;

    grid-template-columns: repeat(6, 1fr);
    > * {
      grid-column-end: span 6;

      @media (min-width: ${breakpoints[0]}) {
        grid-column-end: span 3;
      }

      @media (min-width: ${breakpoints[2]}) {
        grid-column-end: span 2;
      }
    }

    /* Ensure all images are responsive within the grid. */
    img,
    svg,
    video {
      max-width: 100%;
      height: auto;
    }
  `
)

/**
 * Renders each children as a column.
 *
 * Will have 3 columns on big screens, 2 on medium screens and 1 on small screens.
 */
const Columns = (props) => <StyledColumns {...props} />

export default Columns
