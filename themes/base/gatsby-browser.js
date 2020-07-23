import React from 'react'
import propTypes from 'prop-types'

import icons from './src/icons'
import IconsContext from '@gatsby-mdx-suite/contexts/icons'

export const wrapRootElement = ({ element }) => {
  return <IconsContext.Provider value={icons}>{element}</IconsContext.Provider>
}
wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
}
