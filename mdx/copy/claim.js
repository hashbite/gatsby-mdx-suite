import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import responsiveFont from '@gatsby-mdx-suite/helpers/styling/responsive-font'

import TextBlock from './text-block'

const ClaimWrapper = styled(TextBlock)(
  (props) => css`
    ${responsiveFont(props)}
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
const Claim = (props) => <ClaimWrapper {...props} />

Claim.propTypes = {
  ...TextBlock.propTypes,
  children: propTypes.node,
  fontSizeMin: propTypes.string,
  fontSizeMax: propTypes.string,
  lineHeightMin: propTypes.string,
  lineHeightMax: propTypes.string,
}

Claim.defaultProps = {
  ...TextBlock.defaultProps,
  fontSizeMin: '2.25rem',
  fontSizeMax: '3rem',
}

export default Claim
