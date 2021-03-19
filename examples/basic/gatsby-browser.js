import React from 'react'
import propTypes from 'prop-types'

import { ConsentManagerWrapper } from './src/consent-manager'
export { onRouteUpdate } from './src/consent-manager'

// Implementing consent-manager will be required for all MDX components that connect to third-party providers
export const wrapRootElement = ({ element }) => {
  return <ConsentManagerWrapper>{element}</ConsentManagerWrapper>
}
wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
}
