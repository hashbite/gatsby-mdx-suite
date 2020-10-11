import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

const StyledBoxes = styled.div(
  ({ theme }) =>
    css`
      ${tw`my-content-gap`}
      position: relative;
      display: grid;
      grid-gap: ${theme.spacing.gridGutter || '1rem'};

      grid-template-columns: 1fr;
      grid-auto-rows: auto;

      @media screen and (min-width: ${theme.screens.sm}) {
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
 *   <Box backgroundColor="tomato" />
 *   <Box backgroundColor="#BADA55" />
 *   <Box width="8" height="4" colorSet="red" />
 *   <Box height="4" colorSet="green" />
 *   <Box width="8" height="12" colorSet="blue" />
 * </Boxes>
 * @example
 * <Boxes>
 *   <Box backgroundColor="tomato" />
 *   <Box backgroundColor="#BADA55" />
 * </Boxes>
 */
const Boxes = (props) => <StyledBoxes {...props} />

Boxes.defaultProps = {}

Boxes.propTypes = {
  columns: propTypes.oneOfType([propTypes.number, propTypes.string]),
}

export default Boxes
