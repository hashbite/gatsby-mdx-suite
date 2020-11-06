import { useEffect, useState } from 'react'
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  gtmId: 'GTM-XXXXXXX',
}

const GoogleTagManager = ({ children }) => {
  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    if (!initialized) {
      TagManager.initialize(tagManagerArgs)
      setInitialized(true)
    }
  }, [initialized])
  return children
}

export default GoogleTagManager
