import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const StyledCenter = styled.div(
  () => css`
    margin: 0 auto;
    text-align: center;
  `
)

/**
 * Centers anything inside of it to the horizontal center of the screen.
 */
const Center = (props) => <StyledCenter {...props} />

export default Center
