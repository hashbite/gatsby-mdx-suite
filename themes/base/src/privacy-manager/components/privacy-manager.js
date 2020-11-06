import React, { useState, useEffect, useMemo, useCallback } from 'react'
import propTypes from 'prop-types'
import createPersistedState from 'use-persisted-state'
import { useMDXComponents } from '@mdx-js/react'

import PrivacyManagerForm from './form.js'

import Tracking from './tracking'

import { enhanceState } from '../helpers'
import { PRIVACY_MANAGER_DATA_STRUCTURE_VERSION } from '../config'

import PrivacyManagerContext from '../context'

const usePrivacyManagerState = createPersistedState('privacy-manager')

const PrivacyManager = ({
  children,
  config = { integrations: {}, privacyPolicyId: 'privacyPolicy' },
}) => {
  const MDXComponents = useMDXComponents()

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
  const [hasMounted, setHasMounted] = useState(false)

  const updateState = useCallback(
    (values) => {
      const enhancedState = enhanceState(defaultState, {
        settings: {
          ...defaultState.settings,
          ...values,
        },
      })
      console.log({ enhancedState })
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

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
    <PrivacyManagerContext.Provider
      value={{
        ...activeState,
        open,
        setOpen,
      }}
    >
      {isValidState && userState.settings.statistics ? (
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

PrivacyManager.propTypes = {
  children: propTypes.node.isRequired,
  config: propTypes.object.isRequired,
}

export default PrivacyManager
