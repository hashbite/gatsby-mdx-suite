import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'

const NarrowSectionWrapper = styled.div(
  ({ justify }) => css`
    display: flex;
    justify-content: ${justify};
  `
)

const NarrowSectionContent = styled.div(
  ({ maxWidth }) => css`
    width: 100%;
    max-width: ${maxWidth};
  `
)

const NarrowSection = ({ children, justify, maxWidth }) => {
  return (
    <NarrowSectionWrapper justify={justify}>
      <NarrowSectionContent maxWidth={maxWidth}>
        {children}
      </NarrowSectionContent>
    </NarrowSectionWrapper>
  )
}

NarrowSection.propTypes = {
  children: propTypes.node.isRequired,
  justify: propTypes.string,
  maxWidth: propTypes.string,
}

NarrowSection.defaultProps = {
  justify: 'center',
  maxWidth: '80%',
}

export default NarrowSection
