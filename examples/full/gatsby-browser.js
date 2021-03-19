import React from 'react'
import propTypes from 'prop-types'

import IconsContext from '@gatsby-mdx-suite/contexts/icons'
import icons from './src/icons'

import { ConsentManagerWrapper } from './src/consent-manager'
export { onRouteUpdate } from './src/consent-manager'

// Inject required contexts
export const wrapRootElement = ({ element }) => {
  return (
    <ConsentManagerWrapper>
      <IconsContext.Provider value={icons}>{element}</IconsContext.Provider>
    </ConsentManagerWrapper>
  )
}
wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
}
