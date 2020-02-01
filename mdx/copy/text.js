import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'

const TextWrapper = styled.div(
  ({
    color,
    fontFamily,
    fontSize,
    fontWeight,
    fontStyle,
    lineHeight,
    align,
    theme: { fonts, colors },
  }) => css`
    ${fontFamily &&
      css`
        font-family: ${fonts[fontFamily] || fontFamily};
      `}
    ${color &&
      css`
        color: ${colors[color] || color};
      `}
    ${fontSize &&
      css`
        font-size: ${fontSize};
      `}
    ${fontWeight &&
      css`
        font-weight: ${fontWeight};
      `}
    ${fontStyle &&
      css`
        font-style: ${fontStyle};
      `}

    ${lineHeight &&
      css`
        line-height: ${lineHeight};
      `}
    ${align &&
      css`
        align: ${align};
      `}
  `
)

const Text = ({
  children,
  fontFamily,
  color,
  fontSize,
  fontWeight,
  fontStyle,
  lineHeight,
  align,
}) => {
  return (
    <TextWrapper
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontFamily={fontFamily}
      fontStyle={fontStyle}
      lineHeight={lineHeight}
      align={align}
    >
      {children}
    </TextWrapper>
  )
}

Text.propTypes = {
  children: propTypes.node.isRequired,
  color: propTypes.string,
  fontSize: propTypes.string,
  fontWeight: propTypes.string,
  fontStyle: propTypes.string,
  lineHeight: propTypes.string,
  align: propTypes.string,
  fontFamily: propTypes.string,
}

Text.defaultProps = {
  fontFamily: 'heading',
}

export default Text
