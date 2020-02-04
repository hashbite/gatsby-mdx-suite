import React from 'react'
import propTypes from 'prop-types'

import MdxSuiteContextProvider from '@gatsby-mdx-suite/contexts/provider'

export const wrapRootElement = ({ element }, themeConfig) => {
  return (
    <MdxSuiteContextProvider themeConfig={themeConfig}>
      {element}
    </MdxSuiteContextProvider>
  )
}
wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
}
