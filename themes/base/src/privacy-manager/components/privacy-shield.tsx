import React, { useCallback, useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import tw from 'twin.macro'

import Icon from '@gatsby-mdx-suite/mdx-copy/icon'

import PrivacyManagerContext from 'gatsby-theme-mdx-suite-base/src/privacy-manager/context'
import { useTranslation } from 'react-i18next'

const PrivacyShieldWrapper = styled.div`
  ${tw`
    w-full
    p-content-gap
    text-center
    border border-solid border-4 border-gray-800
    bg-gray-700 text-white`}
`

const PrivacyShieldIcon = styled(Icon)`
  ${tw`text-4xl`}
`
const PrivacyShieldTitle = styled.h3`
  ${tw`text-base text-current`}
`
const PrivacyShieldDescription = styled.p``
const PrivacyShieldAlternative = styled.p`
  ${tw`text-sm`}
`

const PrivacyShieldButton = styled.button`
  &:focus {
    outline: none;
    ${tw`underline`}
  }
`

const PrivacyShieldLink = styled.a`
  ${tw`text-current underline hover:no-underline hover:text-current`}
`

interface PrivacyShieldProps {
  config: any
  fallbackUrl?: string
}

const PrivacyShield: React.FC<PrivacyShieldProps> = ({ config, fallbackUrl = '', children }) => {
  const { t } = useTranslation()
  const { id, category, title, url = '#', icon, description } = config
  const privacyContextData = useContext(PrivacyManagerContext)

  const openPrivacyManager = useCallback(() => {
    privacyContextData.setOpen(true)
  }, [privacyContextData])

  if (!privacyContextData.settings?.[category]?.[id]) {
    return (
      <PrivacyShieldWrapper>
        <PrivacyShieldIcon icon={icon} />
        <PrivacyShieldTitle>{title}</PrivacyShieldTitle>
        <PrivacyShieldDescription>
          <strong>{t('privacyShieldIntro', { title })}</strong>
        </PrivacyShieldDescription>
        <PrivacyShieldDescription>{t(description)}</PrivacyShieldDescription>
        <PrivacyShieldDescription>
          <PrivacyShieldLink href={url} target="_blank" rel="noreferrer">
            {t('privacyShieldLearnMore', { title })}
          </PrivacyShieldLink>
        </PrivacyShieldDescription>
        <PrivacyShieldDescription>
          <PrivacyShieldButton onClick={openPrivacyManager}>
            <Icon icon="settings" /> Change privacy settings
          </PrivacyShieldButton>
        </PrivacyShieldDescription>
        {fallbackUrl && (
          <PrivacyShieldAlternative>
            Alternative:
            <br />
            Visit{' '}
            <PrivacyShieldLink
              href={fallbackUrl}
              target="_blank"
              rel="noreferrer"
            >
              {fallbackUrl}
            </PrivacyShieldLink>
          </PrivacyShieldAlternative>
        )}
      </PrivacyShieldWrapper>
    )
  }
  return <>{children}</>
}

PrivacyShield.propTypes = {
  config: propTypes.object.isRequired,
  // TODO: what's going on here with TypeScript?
  // children: propTypes.node.isRequired,
}

export default PrivacyShield
