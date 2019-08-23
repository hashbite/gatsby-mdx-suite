import React from 'react'
import propTypes from 'prop-types'
import { MDXDataProvider } from '@gatsby-mdx-suite/contexts/mdx-data'
// import MdxDataContextProvider from './src/mdx-data-context-provider'

import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

// Ensure user gets the latest content as soon updates are ready
// Might prevent: https://github.com/gatsbyjs/gatsby/issues/13410
export const onServiceWorkerUpdateReady = () => window.location.reload(true)

export const wrapRootElement = ({ element }) => {
  return <MDXDataProvider>{element}</MDXDataProvider>
  // return (
  //   <div>
  //     <MDXDataProvider>
  //       <div>
  //         <MdxDataContextProvider>
  //           <div>{element}</div>
  //         </MdxDataContextProvider>
  //       </div>
  //     </MDXDataProvider>
  //   </div>
  // )
}
wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
}
