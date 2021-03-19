/**
 * This file integrates consent-manager to protect our visitors privacy
 * and supports us to align with GDPR and CCPA.
 *
 * Learn more: https://github.com/techboi/consent-manager
 */

import React from 'react'

import { ConsentManager, ConsentManagerForm } from '@consent-manager/core'
import createPersistedState from 'use-persisted-state'

import {
  matomoIntegration,
  getMatomoTracker,
} from '@consent-manager/integration-matomo'
import { youtubeIntegration } from '@consent-manager/integration-youtube'

import {
  FallbackComponent,
  UnobtrusiveConsentControlUI,
} from '@consent-manager/interface-default'
import '@consent-manager/interface-default/dist/default.min.css'

import SwitchField from 'gatsby-theme-mdx-suite-base/src/components/form/final-form/switch'
import Button from 'gatsby-theme-mdx-suite-base/src/components/form/fields/button'

const useConsentStateStore = createPersistedState('consent-manager-docs')

const consentManagerConfig = {
  integrations: [
    matomoIntegration({
      // You might want to store these values in environment variables
      matomoURL: 'https://trackboi.uber.space/',
      siteID: 9,
    }),
    youtubeIntegration(),
    {
      id: 'vimeo',
      title: 'vimeo@todo',
      category: 'social',
      description: '@todo',
      Icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 28 28"
          {...props}
        >
          <circle cx="14" cy="14" r="14" fill="currentColor" />
        </svg>
      ),
      privacyPolicyUrl: 'https://gdpr.eu/what-is-gdpr/',
    },
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

  return (
    <ConsentManager
      config={consentManagerConfig}
      store={storage}
      fallbackComponent={(props) => (
        <FallbackComponent Button={Button} {...props} />
      )}
    >
      {children}
      <ConsentManagerForm
        formComponent={UnobtrusiveConsentControlUI}
        Switch={SwitchField}
        SubmitButton={Button}
      />
    </ConsentManager>
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
