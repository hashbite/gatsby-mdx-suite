import React from 'react'
import propTypes from 'prop-types'
import { MDXDataProvider } from '@gatsby-mdx-suite/contexts/mdx-data'

export const wrapRootElement = ({ element }, themeConfig) => {
  return <MDXDataProvider>{element}</MDXDataProvider>
}
wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
}
