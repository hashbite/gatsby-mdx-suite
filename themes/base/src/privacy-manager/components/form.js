import React, { useCallback, useRef, useMemo } from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Form } from 'react-final-form'
import { css } from '@emotion/core'

import Link from '@gatsby-mdx-suite/mdx-link/link'
import Icon from '@gatsby-mdx-suite/mdx-copy/icon'

import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'
import Logo from 'gatsby-theme-mdx-suite-base/src/components/header/logo.js'

import SwitchField from './switch-field'

const Button = styled.button``

const PrivacyManagerWrapper = styled.div`
  ${tw`
    fixed inset-0 bottom-auto
    `}
  z-index: 9999;
  pointer-events: none;
`
const PrivacyManagerCopy = styled.div`
  ${tw`mb-content-gap`}
`

const PrivacyManagerHeadline = styled.h1`
  ${tw`text-2xl leading-snug`}

  strong {
    ${tw`text-green-400`}
  }
`
const PrivacyManagerDescription = styled.p`
  ${tw``}
`

const PrivacyManagerToggle = styled.div`
  ${tw`
        fixed bottom-0 right-0 z-50
        w-6 h-6 m-2
        cursor-pointer
        hover:text-primary`}
  mix-blend-mode: difference;

  &:hover {
    mix-blend-mode: normal;
  }
`

const PrivacyLink = styled(Link)`
  ${tw`text-blue-600`}
  &:after {
    display: none;
  }
`

const PrivacyManagerPreview = styled.div`
  ${tw`bg-gray-800 py-1 md:py-2 cursor-pointer`}
`

const PrivacyManagerPreviewContent = styled.div`
  ${tw`flex items-center justify-between`}
  ${centerToContentColumn()}
`

const PrivacyManagerPanel = styled.div(
  ({ blur }) => css`
    ${tw`flex flex-col items-center justify-end h-screen`}
    ${blur
      ? css`
          backdrop-filter: blur(12px);
        `
      : css`
          pointer-events: none;
        `}
  `
)

const PrivacyManagerPanelContent = styled.div`
  ${tw`
      flex flex-wrap gap-grid-gap items-center
      p-4 sm:p-8 bg-white text-gray-900 w-screen
    `}
  pointer-events: all;
  /* box-shadow: 0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05); */
  box-shadow: 0 -20px 25px -5px rgba(0, 0, 0, 0.1),
    0 -10px 10px -5px rgba(0, 0, 0, 0.04);
  /* box-shadow: 0 -25px 50px -12px rgba(0, 0, 0, 0.25); */
`

const PrivacyForm = styled.form`
  ${tw`flex-auto`}
`

const PrivacyManagerBubble = styled.div`
  ${tw`w-2 h-2 flex-none mr-8 rounded-full bg-red-500`}
`
const PrivacyManagerPreviewLabel = styled.div`
  ${tw`flex-auto text-center text-xs text-green-400`}
`

const PrivacyLogo = styled(Logo)`
  ${tw`mb-content-gap`}
  max-width: 210px;
  width: 100%;
`

const IntegrationCategories = styled.div`
  ${tw`
    flex flex-wrap justify-between gap-grid-gap
  `}
`
const IntegrationCategory = styled.div`
  ${tw`text-gray-800`}

  max-width: 420px;
  flex: 1 0 300px;
`
const IntegrationCategoryTitle = styled.h2`
  ${tw`text-base font-sans font-bold text-gray-700 uppercase p-1 text-center bg-gray-100`}
`
const IntegrationCategoryIntegrations = styled.div`
  ${tw`
    grid gap-grid-gap justify-center
  `}
  grid-template-columns: repeat(auto-fit, minmax(100px, max-content));
`

const IntegrationField = styled.div`
  ${tw`text-center`}
`
const IntegrationIcon = styled(Icon)`
  ${tw`text-4xl`}
`
const IntegrationTitle = styled.h3`
  ${tw`text-base`}
`

const PrivacyManagerControls = styled.div`
  ${tw`mt-8 flex gap-grid-gap items-stretch`}

  button {
    ${tw`flex-auto bg-gray-200 px-4 py-2`}

    &[type="primary"] {
      ${tw`bg-green-400 `}
    }
  }
`

const PrivacyManagerForm = ({
  integrations,
  activeState,
  updateState,
  privacyModeActive,
  open,
  setOpen,
  config,
}) => {
  const refForm = useRef(null)

  const {
    enablePrivacyModeToolbar = false,
    blurBackdrop = false,
    privacyPolicyId = 'privacyPolicy',
  } = config

  const handleFormSubmit = useCallback(
    (values) => {
      updateState(values)
      setOpen(false)
    },
    [updateState, setOpen]
  )

  const handleClose = useCallback(
    (e) => {
      e.preventDefault()
      setOpen(false)
    },
    [setOpen]
  )

  const handleLink = useCallback(
    (e) => {
      setOpen(false)
    },
    [setOpen]
  )

  const handleOpenPrivacyManager = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const adjustWindowPadding = useCallback(
    (node) => {
      const appRoot = document.getElementById('___gatsby')

      if (!node || !privacyModeActive) {
        appRoot.style.paddingTop = 0
        return
      }

      appRoot.style.paddingTop = `${node.clientHeight}px`
    },
    [privacyModeActive]
  )

  const integrationsByCategory = useMemo(() => {
    return Object.keys(integrations).map((category) => {
      const categoryIntegrations = []
      for (const [id, integration] of integrations[category].entries()) {
        const { title, icon, url = '#' } = integration
        const fieldId = `${category}.${id}`
        categoryIntegrations.push(
          <IntegrationField key={fieldId}>
            <IntegrationIcon icon={icon} />
            <IntegrationTitle>
              <a href={url} target="_blank" rel="noreferrer">
                {title}
              </a>
            </IntegrationTitle>
            <SwitchField name={fieldId} />
          </IntegrationField>
        )
      }
      return (
        <IntegrationCategory key={category}>
          <IntegrationCategoryTitle>{category}</IntegrationCategoryTitle>
          <IntegrationCategoryIntegrations>
            {categoryIntegrations}
          </IntegrationCategoryIntegrations>
        </IntegrationCategory>
      )
    })
  }, [integrations])

  return (
    <>
      <PrivacyManagerWrapper>
        {enablePrivacyModeToolbar && privacyModeActive && (
          <PrivacyManagerPreview
            ref={adjustWindowPadding}
            onClick={handleOpenPrivacyManager}
          >
            <PrivacyManagerPreviewContent>
              <PrivacyManagerBubble />
              <PrivacyManagerPreviewLabel>
                privacy mode is on
              </PrivacyManagerPreviewLabel>
            </PrivacyManagerPreviewContent>
          </PrivacyManagerPreview>
        )}
        {open && (
          <PrivacyManagerPanel blur={blurBackdrop}>
            <PrivacyManagerPanelContent>
              <PrivacyManagerCopy>
                <PrivacyLogo />
                <PrivacyManagerHeadline>
                  <strong>we care</strong>
                  <br /> about your privacy.
                </PrivacyManagerHeadline>
              </PrivacyManagerCopy>
              <PrivacyManagerCopy>
                <PrivacyManagerDescription>
                  We've disabled all data processing by default.
                </PrivacyManagerDescription>
                <PrivacyManagerDescription>
                  Data is only loaded and send if you enable it.
                </PrivacyManagerDescription>
                <PrivacyManagerDescription>
                  Here is our{' '}
                  <PrivacyLink id={privacyPolicyId} onClick={handleLink}>
                    privacy policy.
                  </PrivacyLink>
                </PrivacyManagerDescription>
              </PrivacyManagerCopy>
              <Form
                onSubmit={handleFormSubmit}
                initialValues={activeState.settings}
                // debug={console.log}
                render={({ handleSubmit, values }) => (
                  <PrivacyForm onSubmit={handleSubmit} ref={refForm}>
                    <IntegrationCategories>
                      {integrationsByCategory}
                    </IntegrationCategories>
                    <PrivacyManagerControls>
                      <Button type="primary" htmlType="submit">
                        Save
                      </Button>
                      <Button
                        type="secondary"
                        htmlType="button"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                    </PrivacyManagerControls>
                  </PrivacyForm>
                )}
              />
            </PrivacyManagerPanelContent>
          </PrivacyManagerPanel>
        )}
      </PrivacyManagerWrapper>
      {(enablePrivacyModeToolbar ? !(open || privacyModeActive) : !open) && (
        <PrivacyManagerToggle
          onClick={handleOpenPrivacyManager}
          title="Change your privacy settings"
        >
          <Icon icon="settings" />
        </PrivacyManagerToggle>
      )}
    </>
  )
}

export default PrivacyManagerForm
