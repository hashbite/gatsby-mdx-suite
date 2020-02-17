import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'
import isPropValid from '@emotion/is-prop-valid'

const BaseBox = styled('div', {
  shouldForwardProp: (prop) =>
    isPropValid(prop) && !['width', 'height'].includes(prop),
})((props) => {
  const {
    theme: { breakpoints },
    hideOnMobile,
  } = props

  // Default to square aspect ratio
  let { width, height } = props
  if (!width && !height) {
    width = 16
    height = 16
  }
  if (!width) {
    width = height
  }
  if (!height) {
    height = width
  }

  return css`
    position: relative;

    grid-area: span ${height} / span ${width};

    &:before {
      content: '';
      display: block;
      padding-bottom: ${Math.round((height / width) * 100, 2)}%;
    }

    ${hideOnMobile &&
      css`
        display: none;
        @media screen and (min-width: ${breakpoints[0]}) {
          display: block;
        }
      `}
  `
})

BaseBox.displayName = 'BaseBox'

BaseBox.defaultProps = {
  children: null,
  width: null,
  height: null,
  hideOnMobile: false,
}

BaseBox.propTypes = {
  children: propTypes.node,
  // Width of the box. Default: 8 or the same as the box's height
  width: propTypes.number,
  // Height of the box. Default: 8 or the same as the box's width
  height: propTypes.number,
  // Hide box on small viewports
  hideOnMobile: propTypes.bool,
}

export default BaseBox
