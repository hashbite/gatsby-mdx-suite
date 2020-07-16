import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import {
  generatePageMap,
  getPageWithFallback,
} from '@gatsby-mdx-suite/helpers/routing'

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
export default function Link({
  id,
  to,
  href,
  title,
  className = null,
  hash,
  children,
  openInNewTab,
  ...linkProps
}) {
  const {
    themeConfig: { defaultLocale },
    pageContext: { locale },
  } = useContext(MdxSuiteContext)

  if (openInNewTab) {
    linkProps.target = '_blank'
    linkProps.rel = 'noopener'
  }

  const result = useStaticQuery(graphql`
    {
      allSitePage {
        nodes {
          ...MdxSuiteSitePageMetadata
        }
      }
    }
  `)

  // Link internal page when to is given
  if (to) {
    to = [to, hash ? `#${hash}` : null].filter(Boolean).join('')
    return (
      <GatsbyLink
        className={className}
        activeClassName="active"
        to={to}
        {...linkProps}
      >
        {children || title}
      </GatsbyLink>
    )
  }

  // Render a normal anchor when a href is given
  if (href) {
    return (
      <a className={className} href={href} title={title} {...linkProps}>
        {children || title}
      </a>
    )
  }

  // Locate fitting page when (page) id is given
  const pages = result.allSitePage.nodes

  if (!pages) {
    return null
  }

  const pageMap = generatePageMap({ pages, activePageId: id })

  const page = getPageWithFallback({
    pageMap,
    locale: locale || defaultLocale,
    defaultLocale,
  })

  if (!page) {
    console.warn(
      `Unable to find page with id ${id} and locale ${locale} including fallbacks`,
      pageMap
    )
    return null
  }

  const { path, title: pageTitle } = page

  if (!path) {
    console.error('Found page does not have any path to link to', page)
    return null
  }

  // Extend path by hash if given
  const dynamicTo = [path, hash ? `#${hash}` : null].filter(Boolean).join('')

  return (
    <GatsbyLink
      className={className}
      activeClassName="active"
      to={dynamicTo}
      {...linkProps}
    >
      {children || title || pageTitle}
    </GatsbyLink>
  )
}

Link.defaultProps = {
  openInNewTab: false,
}

Link.propTypes = {
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
