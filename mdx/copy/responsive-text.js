import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'

const ResponsiveTextWrapper = styled.div(
  ({
    theme: { breakpoints, fonts },
    fontSizeMin,
    fontSizeMax,
    lineHeightMin,
    lineHeightMax,
    minBreakpoint,
    maxBreakpoint,
    fontFamily,
  }) => css`
    font-size: ${fontSizeMin};
    line-height: ${lineHeightMin};
    font-family: ${fonts[fontFamily]};
    font-weight: bold;

    @media screen and (min-width: ${breakpoints[minBreakpoint]}) {
      font-size: calc(
        ${fontSizeMin} + (${parseFloat(fontSizeMax) - parseFloat(fontSizeMin)}) *
          (
            (100vw - ${breakpoints[minBreakpoint]}) /
              ${parseFloat(breakpoints[maxBreakpoint]) -
                parseFloat(breakpoints[minBreakpoint])}
          )
      );
      line-height: calc(
        ${lineHeightMin} +
          (${parseFloat(lineHeightMax) - parseFloat(lineHeightMin)}) *
          (
            (100vw - ${breakpoints[minBreakpoint]}) /
              ${parseFloat(breakpoints[maxBreakpoint]) -
                parseFloat(breakpoints[minBreakpoint])}
          )
      );
    }
    @media screen and (min-width: ${breakpoints[maxBreakpoint]}) {
      font-size: ${fontSizeMax};
      line-height: ${lineHeightMax};
    }

    & h1,
    & h2,
    & h3,
    & h4,
    & h5,
    & h6 {
      font-size: inherit;
      line-height: inherit;
    }
  `
)

const ResponsiveText = ({
  children,
  fontSizeMin,
  fontSizeMax,
  fontFamily,
  lineHeightMin,
  lineHeightMax,
  minBreakpoint,
  maxBreakpoint,
}) => {
  return (
    <ResponsiveTextWrapper
      fontSizeMin={fontSizeMin}
      fontSizeMax={fontSizeMax}
      fontFamily={fontFamily}
      lineHeightMin={lineHeightMin}
      lineHeightMax={lineHeightMax}
      minBreakpoint={minBreakpoint}
      maxBreakpoint={maxBreakpoint}
    >
      {children}
    </ResponsiveTextWrapper>
  )
}

ResponsiveText.propTypes = {
  children: propTypes.node.isRequired,
  fontSizeMin: propTypes.string,
  fontSizeMax: propTypes.string,
  fontFamily: propTypes.string,
  lineHeightMin: propTypes.string,
  lineHeightMax: propTypes.string,
  minBreakpoint: propTypes.number,
  maxBreakpoint: propTypes.number,
}

ResponsiveText.defaultProps = {
  fontSizeMin: '26px',
  fontSizeMax: '64px',
  fontFamily: 'heading',
  lineHeightMin: '1.4em',
  lineHeightMax: '1.1em',
  minBreakpoint: 0,
  maxBreakpoint: 2,
}

export default ResponsiveText
