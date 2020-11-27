import React from 'react'
import propTypes from 'prop-types'

import LinkRenderer from './link-renderer'

/**
 * Link either an internal or external page.
 *
 * Title will be automatically set for internal pages
 *
 * @example
 * <Link id="randomPageId" />
 * @example
 * <Link id="randomPageId">Internal link with given title</Link>
 * @example
 * <Link to="/docs">Internal link to hardcoded page</Link>
 * @example
 * <Link href="https://google.com">External link to Google</Link>
 * @example
 * <Link href="https://google.com" openInNewTab>External link to Google, opening in a new tab</Link>
 */
export default function MdxLink(props) {
  return <LinkRenderer {...props} />
}

MdxLink.displayName = 'Link'

MdxLink.defaultProps = {
  openInNewTab: false,
}

MdxLink.propTypes = {
  /** Id of an internal page to link to */
  id: propTypes.string,
  /** Slug of an internal page to link to. **Note:** use this for hard-coded pages **only** */
  to: propTypes.string,
  /** URI of an external page to link to */
  href: propTypes.string,
  /** Option hash to attach to the link href */
  hash: propTypes.string,
  /** Optional title. Should be set for a11y and seo reasons when link has non-text content. */
  title: propTypes.string,
  /** Optional link class */
  className: propTypes.string,
  /** Open linked page in new tag. Should only be used for edge-cases. See: https://css-tricks.com/use-target_blank/ */
  openInNewTab: propTypes.bool,
  children: propTypes.node,
}
