import { useEffect, useState } from 'react'
import propTypes from 'prop-types'

import ReactGA from 'react-ga'

const GoogleTagAnalytics = ({ children, trackingId }) => {
  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    if (!initialized) {
      ReactGA.initialize(trackingId)
      ReactGA.pageview(window.location.pathname + window.location.search)
      window.ga = ReactGA.ga()
      window.ReactGA = ReactGA
      setInitialized(true)
    }
  }, [initialized, trackingId])

  return children
}

GoogleTagAnalytics.propTypes = {
  trackingId: propTypes.string.isRequired,
}

export default GoogleTagAnalytics
