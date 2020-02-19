import React from 'react'
import styled from '@emotion/styled'

import Link from './link'

const StyledCTA = styled(Link)`
  outline: 1px dashed tomato;
`

/**
 * Renders a Link styled as a call to action button.
 */
const CTA = (props) => <StyledCTA {...props} />

CTA.propTypes = Link.propTypes
CTA.defaultProps = Link.defaultProps

export default CTA
