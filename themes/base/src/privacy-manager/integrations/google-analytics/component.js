import { useEffect, useState } from 'react'
import ReactGA from 'react-ga'

const GoogleTagAnalytics = ({ children }) => {
  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    if (!initialized) {
      ReactGA.initialize('UA-XXXXXXX-1')
      ReactGA.pageview(window.location.pathname + window.location.search)
      window.ga = ReactGA.ga()
      window.ReactGA = ReactGA
      setInitialized(true)
    }
  }, [initialized])
  return children
}

export default GoogleTagAnalytics
