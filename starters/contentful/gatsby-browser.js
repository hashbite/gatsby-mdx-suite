import React from 'react'
import propTypes from 'prop-types'

import IconsContext from '@gatsby-mdx-suite/contexts/icons'

import {
  EntypoCheck,
  EntypoControllerRecord,
  EntypoDotSingle,
  EntypoStar,
  EntypoStarOutlined,
  EntypoVinyl,
  EntypoFacebook,
  EntypoInstagram,
  EntypoYoutube,
  EntypoLinkedin,
} from 'react-entypo-icons'

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This website has been updated. ` + `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}

export const wrapRootElement = ({ element }) => (
  <IconsContext.Provider
    value={{
      check: { icon: EntypoCheck, scale: 1.2 },
      circle: { icon: EntypoVinyl, scale: 0.8 },
      dot: { icon: EntypoControllerRecord, scale: 0.8 },
      dotSmall: { icon: EntypoDotSingle, scale: 1.8 },
      star: { icon: EntypoStar },
      starOutlined: { icon: EntypoStarOutlined },
      facebook: { icon: EntypoFacebook },
      instagram: { icon: EntypoInstagram },
      youtube: { icon: EntypoYoutube },
      linkedin: { icon: EntypoLinkedin },
    }}
  >
    {element}
  </IconsContext.Provider>
)
wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
}
