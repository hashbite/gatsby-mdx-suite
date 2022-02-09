import React from 'react'
import propTypes from 'prop-types'

import { ContextProvider } from './src/context-provider'

export const wrapRootElement = ({ element }, config) => {
  return <ContextProvider element={element} config={config} />
}
wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
}
