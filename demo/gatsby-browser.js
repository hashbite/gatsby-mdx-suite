import React from 'react'
import propTypes from 'prop-types'
import { MDXDataProvider } from '@gatsby-mdx-suite/contexts/mdx-data'
import MdxDataContextProvider from './src/mdx-data-context-provider'

import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

// Ensure user gets the latest content as soon updates are ready
// Might prevent: https://github.com/gatsbyjs/gatsby/issues/13410
// @todo really still needed with offline plugin v3? this can be pretty annoying
export const onServiceWorkerUpdateReady = () => window.location.reload(true)

// @todo looks like we can do graphql query hooks only with wrapPageElement
// but documentation says provider components should use wrapRootElement
// maybe a gatsby bug????
export const wrapPageElement = ({ element }) => {
  return (
    <MDXDataProvider>
      <MdxDataContextProvider>{element}</MdxDataContextProvider>
    </MDXDataProvider>
  )
}
wrapPageElement.propTypes = {
  element: propTypes.element.isRequired,
}
