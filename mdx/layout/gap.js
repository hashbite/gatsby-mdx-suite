import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const StyledGap = styled.div(
  ({ theme, gap = '4' }) => css`
    height: ${theme.spacing[`s${gap}`]}px;
  `
)

/**
 * Creates a vertical gap between content.
 */
const Gap = (props) => <StyledGap {...props} />

export default Gap
