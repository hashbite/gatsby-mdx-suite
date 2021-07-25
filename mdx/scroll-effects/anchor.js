import React from 'react'
import propTypes from 'prop-types'

/**
 * Set a scroll position and use it as destination for an `<AnchorHook/>` component.
 *
 * Will be not visible to the visitor. Wrap it around `<Sections/>` to achieve the best scroll result.
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
 * <Anchor id="end-of-page">
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
 * </Anchor>
 */
export default function Anchor({ id, children }) {
  return <div id={id}>{children}</div>
}

Anchor.propTypes = {
  /** The id of the hook. You need this value for `<AnchorHook />` */
  id: propTypes.string.isRequired,
}
