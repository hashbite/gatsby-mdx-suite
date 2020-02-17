import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'

const Boxes = styled.div(
  ({ theme: { sizes, breakpoints }, mobileColumns }) => css`
    position: relative;
    display: grid;
    grid-gap: ${sizes.gridGutter || '1rem'};

    grid-template-columns: repeat(${mobileColumns}, 1fr);
    grid-auto-rows: min-content;

    @media screen and (min-width: ${breakpoints[0]}) {
      grid-template-columns: repeat(32, 1fr);
    }
  `
)

Boxes.defaultProps = {
  mobileColumns: 16,
}

Boxes.propTypes = {
  columns: propTypes.number,
  mobileColumns: propTypes.number,
}

export default Boxes
