import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import tw from 'twin.macro'

import Link from './link'

export const styleCTA = ({ theme, disabled }) => css`
  ${tw`font-bold py-2 px-4 rounded shadow`}

  background: ${theme.colors.primary};
  color: ${theme.colors['root-background']};

  ${disabled && tw`bg-gray-600 cursor-not-allowed`}
`

const StyledCTA = styled(Link)(styleCTA)

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
