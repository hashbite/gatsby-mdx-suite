import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'

const StyledBoxes = styled.div(
  ({ theme: { sizes, breakpoints }, mobileColumns }) => css`
    position: relative;
    display: grid;
    grid-gap: ${sizes.gridGutter || '1rem'};

    grid-template-columns: repeat(${mobileColumns}, 1fr);
    grid-auto-rows: 1fr;

    @media screen and (min-width: ${breakpoints[0]}) {
      grid-template-columns: repeat(48, 1fr);
    }

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
  `
)

/**
 * Creates a 48 column grid layout.
 */
const Boxes = (props) => <StyledBoxes {...props} />

Boxes.defaultProps = {
  mobileColumns: 24,
}

Boxes.propTypes = {
  columns: propTypes.number,
  mobileColumns: propTypes.number,
}

export default Boxes
