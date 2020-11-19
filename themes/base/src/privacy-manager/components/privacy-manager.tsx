import React, { useState, useMemo, useCallback, ComponentType } from 'react'
import createPersistedState from 'use-persisted-state'
import { useMDXComponents } from '@mdx-js/react'

import PrivacyManagerForm from './form'

import Tracking, { PrivacyManagerTrackingProps } from './tracking'

import { enhanceState } from '../helpers'
import { PRIVACY_MANAGER_DATA_STRUCTURE_VERSION } from '../config'

import PrivacyManagerContext from '../context'


interface PrivacyManagerComponentStaticAnnotation {
  id: string
  category: string
  trackingConfig: {}
}

interface PrivacyManagerConfig {
  integrations: {},
  privacyPolicyId: string
  trackingConfig: PrivacyManagerTrackingProps
}

interface ComponentDictionary {
  [name: string]: ComponentType<any> & { privacy?: PrivacyManagerComponentStaticAnnotation }
}

const usePrivacyManagerState = createPersistedState('privacy-manager')

const PrivacyManager: React.FC<{ config: PrivacyManagerConfig }> = ({
  children,
  config = { integrations: {}, privacyPolicyId: 'privacyPolicy' },
}) => {
  const MDXComponents: ComponentDictionary = useMDXComponents()

  const integrations = useMemo(() => {
    const locatedIntegrations = {}

    // Add project specific integrations
    for (const [category, integrations] of Object.entries(
      config.integrations
    )) {
      if (!locatedIntegrations[category]) {
        locatedIntegrations[category] = new Map()
      }
      for (const [id, integration] of Object.entries(integrations)) {
        if (!locatedIntegrations[category].has(id)) {
          locatedIntegrations[category].set(id, integration)
        }
      }
    }

    // Add integrations from MDX components
    for (const component of Object.values(MDXComponents)) {
      if (component?.privacy?.category) {
        const {
          privacy: { id, category, ...integration },
        } = component
        if (!locatedIntegrations[category]) {
          locatedIntegrations[category] = new Map()
        }
        if (!locatedIntegrations[category].has(id)) {
          locatedIntegrations[category].set(id, integration)
        }
      }
    }

    return locatedIntegrations
  }, [config.integrations, MDXComponents])

  // Set default state based on enabled integrations
  const defaultState = useMemo(() => {
    const settings = {}

    for (const category of Object.keys(integrations)) {
      settings[category] = {}
      for (const id of integrations[category].keys()) {
        settings[category][id] = false
      }
    }

    return enhanceState({ settings }, { settings })
  }, [integrations])

  const [userState, setPrivacyManagerState] = usePrivacyManagerState(null)

  const updateState = useCallback(
    (values) => {
      const enhancedState = enhanceState(defaultState, {
        settings: {
          ...defaultState.settings,
          ...values,
        },
      })
      setPrivacyManagerState(enhancedState)
    },
    [defaultState, setPrivacyManagerState]
  )

  const isValidState = useMemo(
    () =>
      userState?.version === PRIVACY_MANAGER_DATA_STRUCTURE_VERSION &&
      userState?.versionHash === defaultState.versionHash,
    [userState, defaultState]
  )

  const [open, setOpen] = useState(!isValidState)

  const activeState = useMemo(() => (isValidState ? userState : defaultState), [
    isValidState,
    userState,
    defaultState,
  ])

  const privacyModeActive = useMemo(() => {
    if (!isValidState) {
      return true
    }
    for (const categoryIntegrations of Object.values(activeState.settings)) {
      if (Object.values(categoryIntegrations).find(Boolean)) {
        return false
      }
    }

    return true
  }, [isValidState, activeState])

  const shouldTrack = useMemo(
    () =>
      isValidState &&
      userState.settings.statistics &&
      Object.entries(userState.settings.statistics).every(
        ([prop, val]) => val === true
      ),
    [isValidState, userState]
  )

  return (
    <PrivacyManagerContext.Provider
      value={{
        ...activeState,
        open,
        setOpen,
      }}
    >
      {shouldTrack ? (
        <Tracking {...config.trackingConfig}>{children}</Tracking>
      ) : (
        children
      )}
      <PrivacyManagerForm
        integrations={integrations}
        activeState={activeState}
        updateState={updateState}
        privacyModeActive={privacyModeActive}
        open={open}
        setOpen={setOpen}
        config={config}
      />
    </PrivacyManagerContext.Provider>
  )
}

export default PrivacyManager
