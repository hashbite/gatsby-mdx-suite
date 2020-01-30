import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'

const TextWrapper = styled.div(
  ({
    color,
    fontType,
    fontSize,
    fontWeight,
    lineHeight,
    align,
    theme: { fonts },
  }) => css`
    font-family: ${fonts[fontType]};

    ${color &&
      css`
        color: ${color};
      `}
    ${fontSize &&
      css`
        font-size: ${fontSize};
      `}
    ${fontWeight &&
      css`
        font-weight: ${fontWeight};
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
  fontType,
  color,
  fontSize,
  fontWeight,
  lineHeight,
  align,
}) => {
  return (
    <TextWrapper
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontType={fontType}
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
  lineHeight: propTypes.string,
  align: propTypes.string,
  fontType: propTypes.string,
}

Text.defaultProps = {
  fontType: 'heading',
}

export default Text
