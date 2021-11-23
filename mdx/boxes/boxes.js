import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/react'
import verticalRhythm from '@gatsby-mdx-suite/helpers/styling/vertical-rhythm'

const StyledBoxes = styled.div(
  ({ theme }) =>
    css`
      ${verticalRhythm}
      position: relative;
      display: grid;
      grid-gap: ${theme.spacing.gridGutter || '1rem'};

      grid-template-columns: 1fr;
      grid-auto-rows: auto;

      @media screen and (min-width: ${theme.screens.md}) {
        grid-template-columns: repeat(48, 1fr);
        grid-auto-rows: 1fr;
      }

      // Ensure square base grid
      &:before {
        content: '';
        width: 0;
        padding-bottom: 100%;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
      }

      > *:first-of-type {
        grid-row-start: 1;
        grid-column-start: 1;
      }

      // Allow stacking of boxes components
      & + & {
        margin-top: ${theme.spacing.gridGutter || '1rem'};
      }
    `
)

/**
 * Wrap all `<Box/>` components in a `<Boxes/>` component to enable a 48 column grid.
 *
 * @example
 * <Boxes>
 *   <Box width="8" height="4" colorSet="red" />
 *   <Box height="4" colorSet="green" />
 *   <Box width="8" height="12" colorSet="blue" />
 * </Boxes>
 * @example
 * <Boxes>
 *   <Box colors={{background: "tomato"}} />
 *   <Box colors={{background: "#BADA55"}} />
 * </Boxes>
 */
const Boxes = (props) => <StyledBoxes {...props} />

Boxes.propTypes = {
  children: propTypes.node.isRequired,
}

export default Boxes
