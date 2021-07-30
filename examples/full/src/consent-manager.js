/**
 * This file integrates consent-manager to protect our visitors privacy
 * and supports us to align with GDPR and CCPA.
 *
 * Learn more: https://github.com/techboi/consent-manager
 */

import React from 'react'

import createPersistedState from 'use-persisted-state'

import {
  matomoIntegration,
  getMatomoTracker,
} from '@consent-manager/integration-matomo'

import { ConsentManagerDefaultInterface } from '@consent-manager/interface-default'
import '@consent-manager/interface-default/dist/default.min.css'

import SwitchField from 'gatsby-theme-mdx-suite-base/src/components/form/final-form/switch'
import Button from 'gatsby-theme-mdx-suite-base/src/components/form/fields/button'

import components from 'gatsby-theme-mdx-suite-core/src/components'

import { useConsentManagerConfig } from '@gatsby-mdx-suite/helpers/hooks/use-consent-manager-config'

const useConsentStateStore = createPersistedState('consent-manager-docs')

const consentManagerConfig = {
  integrations: [
    matomoIntegration({
      // You might want to store these values in environment variables
      matomoURL: 'https://statistics.hashbite.net/',
      siteID: 9,
    }),
  ],
}

/**
 * Wraps the apps root element with consent-manager
 * See:
 * * https://github.com/techboi/consent-manager
 * * https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapRootElement
 */
export function ConsentManagerWrapper({ children }) {
  const storage = useConsentStateStore()
  const config = useConsentManagerConfig(components, consentManagerConfig)

  return (
    <ConsentManagerDefaultInterface
      config={config}
      store={storage}
      Switch={SwitchField}
      Button={Button}
    >
      {children}
    </ConsentManagerDefaultInterface>
  )
}

/**
 * Called when the user changes routes, including on the initial load of the app
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#onRouteUpdate
 */
export function onRouteUpdate({ location, prevLocation }) {
  const { trackPageViewSPA } = getMatomoTracker()

  // This ensures plugins like react-helmet finished their work
  window.setTimeout(() => {
    const trackResult = trackPageViewSPA({ location, prevLocation })

    // Debug logging
    if (process.env.gatsby_log_level === `verbose`) {
      const { url, title } = trackResult
      if (!trackResult) {
        return console.debug(
          `[Matomo] Failed to track page view: ${url} - ${title}`
        )
      }
      console.debug(`[Matomo] Page view for: ${url} - ${title}`)
    }
  }, 0)
}
