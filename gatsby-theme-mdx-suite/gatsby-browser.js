import React from 'react'
import propTypes from 'prop-types'

import MdxSuiteContextProvider from '@gatsby-mdx-suite/contexts/provider'

export const wrapRootElement = ({ element }, themeConfig) => {
  const { langs, defaultLocale } = themeConfig
  return (
    <MdxSuiteContextProvider langs={langs} defaultLocale={defaultLocale}>
      {element}
    </MdxSuiteContextProvider>
  )
}
wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
}
