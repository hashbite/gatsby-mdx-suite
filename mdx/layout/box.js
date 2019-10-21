import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'

const BoxWrapper = styled.div`
  ${({ height }) =>
    height &&
    height > 1 &&
    css`
      grid-row-end: span ${height};
    `}
  ${({ width }) =>
    width &&
    width > 1 &&
    css`
      grid-column-end: span ${width};
    `}
  ${({ background, theme }) =>
    background &&
    css`
      background: ${theme.colors[background]};
    `}
  ${({ color, theme }) =>
    color &&
    css`
      color: ${theme.colors[color]};
    `}
`

const Box = ({ children, ...props }) => {
  return <BoxWrapper {...props}>{children}</BoxWrapper>
}

Box.defaultProps = {
  children: null,
}

Box.propTypes = {
  children: propTypes.node,
}

export default Box
