import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'

const BoxContentWrapper = styled.div`
  padding: 32px;
`

const BoxContent = ({ children, ...props }) => {
  return <BoxContentWrapper {...props}>{children}</BoxContentWrapper>
}

BoxContent.defaultProps = {
  children: null,
}

BoxContent.propTypes = {
  children: propTypes.node,
}

export default BoxContent
