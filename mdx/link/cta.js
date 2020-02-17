import styled from '@emotion/styled'

import Link from './link'

const CTA = styled(Link)`
  outline: 1px dashed tomato;
`

CTA.propTypes = Link.propTypes
CTA.defaultProps = Link.defaultProps

export default CTA
