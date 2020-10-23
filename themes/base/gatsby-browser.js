import React from 'react'
import propTypes from 'prop-types'

import Layout from './src/components/layout/layout'
import defaultIcons from './src/default-icons'
import IconsContext from '@gatsby-mdx-suite/contexts/icons'

export const wrapRootElement = ({ element }) => {
  // Only set default icons when project does not define any icons
  const seedIcons = (contextIcons) => {
    return contextIcons.size ? (
      element
    ) : (
      <IconsContext.Provider value={defaultIcons}>
        {element}
      </IconsContext.Provider>
    )
  }

  return <IconsContext.Consumer>{seedIcons}</IconsContext.Consumer>
}
wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
}

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>
}

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This website has been updated.\n\nReload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}
