import React, { useCallback, useRef, useMemo } from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Form } from 'react-final-form'
import { css } from '@emotion/core'

import Link from '@gatsby-mdx-suite/mdx-link/link'
import Icon from '@gatsby-mdx-suite/mdx-copy/icon'

import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'
import Logo from 'gatsby-theme-mdx-suite-base/src/components/header/logo.js'

import SwitchField from '../../components/form/fields/switch'
import { useTranslation } from 'react-i18next'

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
  ${tw`text-2xl leading-snug pb-content-gap md:hidden`}

  strong {
    ${tw`text-green-400`}
  }
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
  ${tw`
    block mt-content-gap md:mt-0 md:inline-block md:pl-1
    text-blue-600
  `}
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

const PrivacyManagerPanelWrapper = styled.div`
  ${tw`
      relative
      md:flex flex-wrap gap-grid-gap items-center
      bg-white text-gray-900 w-screen
    `}
  pointer-events: all;
  box-shadow: 0 -20px 25px -5px rgba(0, 0, 0, 0.1),
    0 -10px 10px -5px rgba(0, 0, 0, 0.04);
`

const PrivacyManagerPanelContent = styled.div`
  ${centerToContentColumn}
  ${tw`p-10`}
`

const PrivacyForm = styled.form`
  ${tw`md:flex md:gap-20 lg:gap-40`}
`

const PrivacyFormContent = styled.div`
  ${tw``}
`

const PrivacyManagerBubble = styled.div`
  ${tw`w-2 h-2 flex-none mr-8 rounded-full bg-red-500`}
`
const PrivacyManagerPreviewLabel = styled.div`
  ${tw`flex-auto text-center text-xs text-green-400`}
`

const PrivacyLogo = styled(Logo)`
  ${tw`mb-content-gap mx-auto md:hidden`}
  max-width: 210px;
  width: 100%;
`

const IntegrationFieldsWrapper = styled.div`
  ${tw`md:flex flex-wrap gap-content-gap my-8 md:my-0`}
`

const IntegrationField = styled.div`
  ${tw`mb-content-gap md:mb-0 flex items-center`}
`
// const IntegrationIcon = styled(Icon)`
//   ${tw`text-xl px-2`}
// `
const IntegrationTitle = styled.span`
  ${tw``}
`

const PrivacyManagerControls = styled.div`
  ${tw``}
`

const SaveButton = styled.button`
  ${tw`
  px-16 py-6 w-full
  text-center text-xl font-bold
  bg-gray-200 bg-green-400 rounded`}
`
const CloseButton = styled.button`
  ${tw`absolute left-0 top-0 p-3`}
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
  const { t } = useTranslation()

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

  const integrationFields = useMemo(() => {
    const fields = []
    Object.keys(integrations).forEach((category) => {
      for (const [id, integration] of integrations[category].entries()) {
        const { title } = integration
        const fieldId = `${category}.${id}`
        fields.push(
          <IntegrationField key={fieldId}>
            <SwitchField name={fieldId} />
            <div>
              {/* <IntegrationIcon icon={icon} verticalAlign="middle" /> */}
              <IntegrationTitle>{title}</IntegrationTitle>
            </div>
          </IntegrationField>
        )
      }
    })
    return fields
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
                {t('privacyManagerPrivacyModeEnabled')}
              </PrivacyManagerPreviewLabel>
            </PrivacyManagerPreviewContent>
          </PrivacyManagerPreview>
        )}
        {open && (
          <PrivacyManagerPanel blur={blurBackdrop}>
            <PrivacyManagerPanelWrapper>
              <PrivacyManagerPanelContent>
                <Form
                  onSubmit={handleFormSubmit}
                  initialValues={activeState.settings}
                  // debug={console.log}
                  render={({ handleSubmit, values }) => (
                    <PrivacyForm onSubmit={handleSubmit} ref={refForm}>
                      <PrivacyFormContent>
                        <div>
                          <PrivacyLogo />
                          <PrivacyManagerHeadline>
                            {t('privacyManagerHeadline')}
                          </PrivacyManagerHeadline>
                        </div>
                        <PrivacyManagerCopy>
                          {t('privacyManagerDescription')}
                          <PrivacyLink
                            id={privacyPolicyId}
                            onClick={handleLink}
                          />
                        </PrivacyManagerCopy>
                        <IntegrationFieldsWrapper>
                          {integrationFields}
                        </IntegrationFieldsWrapper>
                      </PrivacyFormContent>
                      <PrivacyManagerControls>
                        <SaveButton type="primary" htmlType="submit">
                          {t('save')}
                        </SaveButton>
                        <CloseButton
                          type="secondary"
                          htmlType="button"
                          onClick={handleClose}
                        >
                          <Icon icon="close" verticalAlign="middle" />
                        </CloseButton>
                      </PrivacyManagerControls>
                    </PrivacyForm>
                  )}
                />
              </PrivacyManagerPanelContent>
            </PrivacyManagerPanelWrapper>
          </PrivacyManagerPanel>
        )}
      </PrivacyManagerWrapper>
      {(enablePrivacyModeToolbar ? !(open || privacyModeActive) : !open) && (
        <PrivacyManagerToggle
          onClick={handleOpenPrivacyManager}
          title="Change your privacy settings"
        >
          <Icon icon="settings" verticalAlign="middle" />
        </PrivacyManagerToggle>
      )}
    </>
  )
}

export default PrivacyManagerForm
