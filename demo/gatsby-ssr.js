import React from 'react'
import propTypes from 'prop-types'
import { MDXDataProvider } from '@gatsby-mdx-suite/contexts/mdx-data'
import MdxDataContextProvider from './src/mdx-data-context-provider'

export const wrapRootElement = ({ element }) => {
  return (
    <MDXDataProvider>
      <MdxDataContextProvider>{element}</MdxDataContextProvider>
    </MDXDataProvider>
  )
}
wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
}
