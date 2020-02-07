import React from 'react'
import propTypes from 'prop-types'

// import 'tailwindcss/base.css'

import './src/style.css'

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
