import React from 'react'
import propTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import responsiveFont from '@gatsby-mdx-suite/helpers/styling/responsive-font'

import TextBlock from './text-block'

const StyledResponsiveTextBlock = styled(TextBlock)(
  (props) => css`
    ${responsiveFont(props)}
  `
)

/**
 * A regular text block but font size and line height depend on the users view port.
 *
 * Supports all features of the `<TextBlock />` component.
 *
 * @example
 * <ResponsiveTextBlock>
 *
 * This text will grow in font size depending on the current width of the users screen.
 *
 * </ResponsiveTextBlock>
 */
const ResponsiveTextBlock = (props) => <StyledResponsiveTextBlock {...props} />

ResponsiveTextBlock.propTypes = {
  ...TextBlock.propTypes,
  children: propTypes.node,
  fontSizeMin: propTypes.string,
  fontSizeMax: propTypes.string,
  lineHeightMin: propTypes.string,
  lineHeightMax: propTypes.string,
}

ResponsiveTextBlock.defaultProps = {
  ...TextBlock.defaultProps,
  fontSizeMin: '16px',
  fontSizeMax: '32px',
  lineHeightMin: '1.5em',
  lineHeightMax: '1.3em',
}

export default ResponsiveTextBlock
