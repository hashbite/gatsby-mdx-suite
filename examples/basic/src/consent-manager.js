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
  FallbackComponent,
  UnobtrusiveConsentControlUI,
} from '@consent-manager/interface-default'
import '@consent-manager/interface-default/dist/default.min.css'

import SwitchField from 'gatsby-theme-mdx-suite-base/src/components/form/final-form/switch'
import Button from 'gatsby-theme-mdx-suite-base/src/components/form/fields/button'

import components from 'gatsby-theme-mdx-suite-core/src/components'

import { useConsentManagerConfig } from '@gatsby-mdx-suite/helpers/hooks/use-consent-manager-config'

const useConsentStateStore = createPersistedState('consent-manager-docs')

const consentManagerConfig = {
  integrations: [
    // Add your analytics here
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
    <ConsentManager
      config={config}
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
//  export function onRouteUpdate({ location, prevLocation }) {}
