import React from 'react'
import propTypes from 'prop-types'
import { MDXDataProvider } from '@gatsby-mdx-suite/contexts/mdx-data'

// @todo looks like we can do graphql query hooks only with wrapPageElement
// but documentation says provider components should use wrapRootElement
// maybe a gatsby bug????
export const wrapPageElement = ({ element }, themeConfig) => {
  return <MDXDataProvider>{element}</MDXDataProvider>
}
wrapPageElement.propTypes = {
  element: propTypes.element.isRequired,
}
