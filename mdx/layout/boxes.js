import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'

const Boxes = styled.div(
  ({ theme: { sizes, breakpoints, spacing }, mobileColumns }) => css`
    display: grid;
    grid-gap: ${sizes.gridGutter || 16}px;

    grid-template-columns: repeat(${mobileColumns}, 1fr);
    grid-auto-rows: minmax(
      calc((100vw - ${spacing.s2}px) / ${mobileColumns}),
      min-content
    );

    @media screen and (min-width: ${breakpoints[0]}) {
      grid-template-columns: repeat(
        auto-fit,
        minmax(${sizes.gridColumnWidth || 128}px, 1fr)
      );
      grid-auto-rows: ${sizes.gridColumnWidth || 128}px;
    }
  `
)

Boxes.defaultProps = {
  mobileColumns: 1,
}

Boxes.propTypes = {
  mobileColumns: propTypes.number,
}

export default Boxes
