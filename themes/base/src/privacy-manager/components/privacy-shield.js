import React, { useCallback, useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import tw from 'twin.macro'

import Icon from '@gatsby-mdx-suite/mdx-copy/icon'

import PrivacyManagerContext from '../context'

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
  ${tw`text-base`}
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

const PrivacyShield = ({ config, fallbackUrl = false, children }) => {
  const { id, category, title, url = '#', icon } = config
  const privacyContextData = useContext(PrivacyManagerContext)

  const openPrivacyManager = useCallback(() => {
    privacyContextData.setOpen(true)
  }, [privacyContextData])

  if (!privacyContextData.settings?.[category]?.[id]) {
    return (
      <PrivacyShieldWrapper>
        <PrivacyShieldIcon icon={icon} />
        <PrivacyShieldTitle>
          <a href={url}>{title}</a>
        </PrivacyShieldTitle>
        <PrivacyShieldDescription>
          <strong>We disabled {title} to protect your privacy.</strong>
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
            <a href={fallbackUrl} target="_blank" rel="noreferrer">
              {fallbackUrl}
            </a>
          </PrivacyShieldAlternative>
        )}
      </PrivacyShieldWrapper>
    )
  }
  return children
}

PrivacyShield.propTypes = {
  config: propTypes.object.isRequired,
  children: propTypes.node.isRequired,
}

export default PrivacyShield
