import React from 'react'
import propTypes from 'prop-types'

import ContentfulPageInjector from './src/contentful-page-injector'

export const wrapPageElement = ({ element }) => {
  return <ContentfulPageInjector>{element}</ContentfulPageInjector>
}
wrapPageElement.propTypes = {
  element: propTypes.element.isRequired,
}
