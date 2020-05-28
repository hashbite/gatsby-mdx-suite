import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import Link from './link'

export const StyledCTA = styled(Link)(
  ({ theme }) => css`
    ${tw`
      py-2 px-6
      hover:font-bold
      rounded-lg`}

    background: ${theme.background};
    color: ${theme.color};
  `
)

/**
 * Renders a Link styled as a call to action button.
 * @example
 * <CTA href="https://www.google.com/">CTA to google.com</CTA>
 * @example
 * <CTA id="randomPageId" />
 */
const CTA = (props) => <StyledCTA {...props} />

CTA.propTypes = Link.propTypes
CTA.defaultProps = Link.defaultProps

export default CTA
