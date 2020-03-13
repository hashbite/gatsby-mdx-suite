import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'

const StyledBoxes = styled.div(
  ({ theme: { sizes, breakpoints } }) => css`
    position: relative;
    display: grid;
    grid-gap: ${sizes.gridGutter || '1rem'};

    grid-template-columns: 1fr;
    grid-auto-rows: auto;

    @media screen and (min-width: ${breakpoints[0]}) {
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

    > *:first-child {
      grid-row-start: 1;
      grid-column-start: 1;
    }

    // Allow stacking of boxes components
    & + & {
      margin-top: ${sizes.gridGutter || '1rem'};
    }
  `
)

/**
 * Creates a 48 column grid layout.
 *
 * @example
 * <Boxes>
 *   <Box backgroundColor="tomato" />
 *   <Box backgroundColor="#BADA55" />
 *   <Box width="8" height="4" colorSet="red" />
 *   <Box height="4" colorSet="green" />
 *   <Box width="8" height="12" colorSet="blue" />
 * </Boxes>
 * @example <caption>Hmm</caption>
 * <Boxes>
 *   <Box backgroundColor="tomato" />
 *   <Box backgroundColor="#BADA55" />
 * </Boxes>
 */
const Boxes = (props) => <StyledBoxes {...props} />

Boxes.defaultProps = {}

Boxes.propTypes = {
  columns: propTypes.number,
}

export default Boxes
