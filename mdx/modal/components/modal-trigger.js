import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { styleCTA } from '@gatsby-mdx-suite/mdx-link/cta'

const ModalTriggerLink = styled.a(
  ({ renderAsCTA, ...props }) => css`
    ${renderAsCTA && styleCTA(props)}
  `
)

export default function ModalTrigger({ title, renderAsCTA, ...props }) {
  return (
    <ModalTriggerLink renderAsCTA={renderAsCTA} {...props}>
      {title}
    </ModalTriggerLink>
  )
}

ModalTrigger.defaultValues = {
  renderAsCTA: false,
}

ModalTrigger.propTypes = {
  /** Title of the ModalTrigger Link or CTA */
  title: propTypes.string.isRequired,
  /** Should it be rendered as CTA? */
  renderAsCTA: propTypes.bool,
}
