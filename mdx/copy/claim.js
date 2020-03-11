import React from 'react'
import propTypes from 'prop-types'
import tw from 'twin.macro'
import styled from '@emotion/styled'

import responsiveFont from '@gatsby-mdx-suite/helpers/styling/responsive-font'

import TextBlock from './text-block'

const ClaimWrapper = styled(TextBlock)`
  ${tw`font-heading font-bold`}
  ${responsiveFont}
`

/**
 * Very bold version of <Claim />
 *
 * Supports all features of the `<TextBlock />` component.
 *
 * @example
 * <Claim>
 *
 * This text will be huge
 *
 * </Claim>
 */
const Claim = ({ children, ...props }) => {
  return <ClaimWrapper {...props}>{children}</ClaimWrapper>
}

Claim.propTypes = {
  children: propTypes.node,
  fontSizeMin: propTypes.string,
  fontSizeMax: propTypes.string,
  lineHeightMin: propTypes.string,
  lineHeightMax: propTypes.string,
}

Claim.defaultProps = {
  tag: 'h1',
  fontSizeMin: '32px',
  fontSizeMax: '64px',
  lineHeightMin: '1.4em',
  lineHeightMax: '1.1em',
}

export default Claim
