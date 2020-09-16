import React from 'react'
import propTypes from 'prop-types'

import defaultIcons from './src/default-icons'
import IconsContext from '@gatsby-mdx-suite/contexts/icons'

export const wrapRootElement = ({ element }) => {
  // Only set default icons when project does not define any icons
  const seedIcons = (contextIcons) => {
    return contextIcons ? (
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

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This website has been updated. ` + `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}
