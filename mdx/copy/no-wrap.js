import React from 'react'
import styled from '@emotion/styled'

const StyledNoWrap = styled.span`
  white-space: nowrap;
`

/**
 * Prevents text from wrapping into a new line.
 */
const NoWrap = (props) => <StyledNoWrap {...props} />

export default NoWrap
