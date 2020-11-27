import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'
import isPropValid from '@emotion/is-prop-valid'

const BaseBox = styled('div', {
  shouldForwardProp: (prop) =>
    isPropValid(prop) && !['width', 'height'].includes(prop),
})((props) => {
  const {
    theme: { screens, colors },
    hideOnMobile,
  } = props

  // Default to square aspect ratio
  let { width, height } = props
  if (!width && !height) {
    width = 24
    height = 24
  }
  if (!width) {
    width = height
  }
  if (!height) {
    height = width
  }

  return css`
    position: relative;
    background: ${colors.background};
    color: ${colors.text};

    @media screen and (max-width: ${screens.sm}) {
      &::before {
        content: '';
        width: 1px;
        margin-left: -1px;
        float: left;
        height: 0;
        padding-top: calc(100% / (${width} / ${height}));
      }
      &::after {
        content: '';
        display: table;
        clear: both;
      }
    }

    @media screen and (min-width: ${screens.sm}) {
      grid-row-end: span ${height};
      grid-column-end: span ${width};
    }

    ${hideOnMobile &&
    css`
      display: none;
      @media screen and (min-width: ${screens.sm}) {
        display: block;
      }
    `}
  `
})

BaseBox.defaultProps = {
  children: null,
  width: null,
  height: null,
  hideOnMobile: false,
}

BaseBox.propTypes = {
  children: propTypes.node,
  // Width of the box. Default: 8 or the same as the box's height
  width: propTypes.oneOfType([propTypes.number, propTypes.string]),
  // Height of the box. Default: 8 or the same as the box's width
  height: propTypes.oneOfType([propTypes.number, propTypes.string]),
  // Hide box on small viewports
  hideOnMobile: propTypes.bool,
}

export default BaseBox
