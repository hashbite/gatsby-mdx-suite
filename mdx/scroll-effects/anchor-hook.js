import React, { useCallback, useEffect, useMemo, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useWindowSize, useSize } from 'react-use'

import Button from 'gatsby-theme-mdx-suite-base/src/components/form/fields/button'

const AnchorHookLink = styled.a``

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
  const href = useMemo(() => `#${to}`, [to])
  const { height: windowHeight } = useWindowSize()

  const handleOnClick = useCallback(
    (e) => {
      e.preventDefault()
      const anchor = document.querySelector(href)
      const anchorTop = anchor.getBoundingClientRect().top
      const anchorHeight = anchor.offsetHeight
      const modifier = parseInt(
        window
          .getComputedStyle(document.body)
          .getPropertyValue('--floating-header-height')
      )

      let scrollAlign = modifier
      if (verticalAlign === 'center') {
        scrollAlign = (windowHeight + modifier) / 2 - anchorHeight / 2
      }
      if (verticalAlign === 'end') {
        scrollAlign = windowHeight - anchorHeight
      }

      const scrollPos = anchorTop - scrollAlign
      window.scrollTo({ top: scrollPos, behavior: 'smooth' })
    },
    [href, verticalAlign, windowHeight]
  )

  return (
    <AnchorHookLink
      as={as === 'CTA' && Button}
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
  verticalAlign: propTypes.oneOf(['start', 'center', 'end']),
  /** Title of the AnchorHook Link or CTA */
  children: propTypes.node.isRequired,
}
