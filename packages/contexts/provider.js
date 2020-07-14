import React, { useContext } from 'react'
import propTypes from 'prop-types'

import MdxSuiteContext from './mdx-suite'

const MdxSuiteContextProvider = ({ children, themeConfig }) => {
  const MdxSuiteData = useContext(MdxSuiteContext)

  return (
    <MdxSuiteContext.Provider
      value={{
        ...MdxSuiteData,
        themeConfig,
      }}
    >
      {children}
    </MdxSuiteContext.Provider>
  )
}

MdxSuiteContextProvider.propTypes = {
  children: propTypes.node.isRequired,
  themeConfig: propTypes.object.isRequired,
}

export default MdxSuiteContextProvider
