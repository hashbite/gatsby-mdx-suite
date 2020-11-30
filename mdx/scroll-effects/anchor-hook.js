import React, { useCallback } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { styleCTA } from '@gatsby-mdx-suite/mdx-link/cta'

const AnchorHookLink = styled.a(
  ({ renderAsCTA, ...props }) => css`
    ${renderAsCTA && styleCTA(props)}
  `
)

/**
 * A trigger to let the user scroll to a certain position of the page.
 *
 * Might displayed as a Link or a CTA component.
 *
 * @example
 *
 * <AnchorHook to="end-of-page" as="CTA">Scroll to the end of this page</AnchorHook>

 * <Image id="randomPictureid" />
 * <Image id="randomPictureid" />
 * <Image id="randomPictureid" />
 * <Image id="randomPictureid" />
 * <Image id="randomPictureid" />
 *
 * <Anchor id="end-of-page" />
 *
 * @example
 * <Anchor id="start-of-page" />
 *
 * <Section>
 *
 * This is a demo on how to use the `<AnchorHook/>` in combination with `<Anchor/>`
 *
 * <AnchorHook to="end-of-page" as="CTA">Scroll to the end of this page</AnchorHook>
 *
 * </Section>
 *
 * <Image id="randomPictureid" />
 * <Image id="randomPictureid" />
 * <Image id="randomPictureid" />
 * <Anchor id="center-of-page" />
 * <Image id="randomPictureid" />
 * <Image id="randomPictureid" />
 * <Image id="randomPictureid" />
 *
 * <Hook id="end-of-page" />
 *
 * <Section>
 *
 * Welcome to the end of the page.
 *
 * You have the following options:
 *
 * * <AnchorHook to="center-of-page" verticalAlign="center">Scroll to the center</AnchorHook>
 * * <AnchorHook to="start-of-page">Back to the top</AnchorHook>
 *
 * </Section>
 */
export default function AnchorHook({ to, as, verticalAlign, children }) {
  const href = `#${to}`

  const handleOnClick = useCallback(
    (e) => {
      e.preventDefault()
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: verticalAlign,
      })
    },
    [verticalAlign, href]
  )

  return (
    <AnchorHookLink
      renderAsCTA={as === 'CTA'}
      onClick={handleOnClick}
      href={href}
    >
      {children}
    </AnchorHookLink>
  )
}

AnchorHook.defaultValues = {
  as: 'Link',
  verticalAlign: 'start',
}

AnchorHook.propTypes = {
  /** The id of hook the user should automatically scroll to. Never have duplicate ids on the same page. */
  to: propTypes.string.isRequired,
  /** Define how the component should look like */
  as: propTypes.oneOf(['Link', 'CTA']),
  /** Define where the element shoudl be positioned vertically after scrolling  */
  verticalAlign: propTypes.oneOf(['start', 'center', 'end', 'nearest']),
  /** Title of the AnchorHook Link or CTA */
  children: propTypes.node.isRequired,
}
