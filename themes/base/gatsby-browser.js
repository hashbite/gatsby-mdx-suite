import React from 'react'
import propTypes from 'prop-types'

import Layout from './src/components/layout/layout'
import { ConsentManagerWrapper } from './src/consent-manager/wrapper'
import defaultIcons from './src/default-icons'
import IconsContext from '@gatsby-mdx-suite/contexts/icons'

export const wrapRootElement = ({ element }) => {
  // @todo move configuration to gatsby-config?
  const page = <ConsentManagerWrapper>{element}</ConsentManagerWrapper>

  // Only set default icons when project does not define any icons
  // @todo get rid of this mess
  const seedIcons = (contextIcons) => {
    return contextIcons.size ? (
      page
    ) : (
      <IconsContext.Provider value={defaultIcons}>{page}</IconsContext.Provider>
    )
  }

  return <IconsContext.Consumer>{seedIcons}</IconsContext.Consumer>
}
wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
}

export const wrapPageElement = ({ element }) => {
  return <Layout {...element.props}>{element}</Layout>
}

// @todo
// export { onRouteUpdate } from './src/privacy-manager/route-updater'

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This website has been updated.\n\nReload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}
