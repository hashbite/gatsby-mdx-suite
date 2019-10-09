import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'

const BoxWrapper = styled.div`
  ${(props) => console.log({ props })}
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

const BoxContent = styled.div`
  padding: 32px;
`

const Box = ({ children, ...props }) => {
  return (
    <BoxWrapper {...props}>
      <BoxContent>{children}</BoxContent>
    </BoxWrapper>
  )
}

Box.propTypes = {
  children: propTypes.node.isRequired,
}

export default Box
