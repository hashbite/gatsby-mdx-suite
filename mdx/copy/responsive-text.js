import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'

import responsiveFont from '@gatsby-mdx-suite/helpers/styling/responsive-font'

const ResponsiveTextWrapper = styled.div`
  ${responsiveFont}

  & h1,
    & h2,
    & h3,
    & h4,
    & h5,
    & h6 {
    font-size: inherit;
    line-height: inherit;
  }
`

/**
 * Let the font size grow from small to big screens.
 * @example <ResponsiveText>I will be **huge** on desktop</ResponsiveText>
 */
const ResponsiveText = ({ children, ...props }) => {
  return <ResponsiveTextWrapper {...props}>{children}</ResponsiveTextWrapper>
}

ResponsiveText.propTypes = {
  children: propTypes.node,
  fontSizeMin: propTypes.string,
  fontSizeMax: propTypes.string,
  lineHeightMin: propTypes.string,
  lineHeightMax: propTypes.string,
}

ResponsiveText.defaultProps = {
  fontSizeMin: '26px',
  fontSizeMax: '64px',
  lineHeightMin: '1.4em',
  lineHeightMax: '1.1em',
}

export default ResponsiveText
