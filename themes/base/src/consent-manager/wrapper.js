import React from 'react'

import { ConsentManager, ConsentManagerForm } from '@consent-manager/core'
import createPersistedState from 'use-persisted-state'

import { matomoIntegration } from '@consent-manager/integration-matomo'
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
