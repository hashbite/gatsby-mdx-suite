import React, { useMemo } from 'react'

import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'

export default ({ urlBase, siteId, ...props }) => {
  const instance = useMemo(() => {
    return createInstance({
      urlBase,
      siteId,
      linkTracking: false, // optional, default value: true
      configurations: {
        disableCookies: true,
        setSecureCookie: true,
        setRequestMethod: 'POST',
      },
    })
  }, [urlBase, siteId])
  return <MatomoProvider value={instance} {...props} />
}
