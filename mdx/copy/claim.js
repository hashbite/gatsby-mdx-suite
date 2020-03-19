import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import responsiveFont from '@gatsby-mdx-suite/helpers/styling/responsive-font'

import TextBlock from './text-block'

const ClaimWrapper = styled(TextBlock)(
  (props) => css`
    ${responsiveFont(props)}
    font-family: ${props.theme.fonts.heading};
    font-weight: ${props.theme.fontWeights.heading};
  `
)

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
