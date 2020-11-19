import { useEffect, useState } from 'react'
import propTypes from 'prop-types'

import ReactGA from 'react-ga'

declare global {
  interface Window {
    ga: (...args: any[]) => void
    ReactGA: unknown
  }
}

export interface GoogleAnalyticsProps {
  trackingId: string
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ children, trackingId }) => {
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

  return <>children</>
}

GoogleAnalytics.propTypes = {
  trackingId: propTypes.string.isRequired,
}

export default GoogleAnalytics
