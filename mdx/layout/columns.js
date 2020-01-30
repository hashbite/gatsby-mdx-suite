import styled from '@emotion/styled'
import { css } from '@emotion/core'

const Columns = styled.div(
  ({
    theme: {
      sizes: { gridGutter },
      breakpoints,
    },
  }) => css`
    display: grid;
    grid-gap: ${gridGutter || 16}px;

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

export default Columns
