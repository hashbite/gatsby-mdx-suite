import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import {
  generatePageMap,
  getPageWithFallback,
} from '@gatsby-mdx-suite/i18n/helpers'

export default function Link({
  id,
  href,
  target = null,
  title,
  className = null,
  hash,
  children,
  ...linkProps
}) {
  const {
    themeConfig: { defaultLocale },
    pageContext: { locale },
  } = useContext(MdxSuiteContext)

  const result = useStaticQuery(graphql`
    {
      allSitePage {
        nodes {
          path
          context {
            pageId
            locale
            title
          }
        }
      }
    }
  `)

  // Render a normal anchor when a href is given
  if (href) {
    return (
      <a className={className} href={href} target={target}>
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
    locale,
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
  const to = [path, hash ? `#${hash}` : null].filter(Boolean).join('')

  return (
    <GatsbyLink
      className={className}
      activeClassName="active"
      to={to}
      target={target}
      {...linkProps}
    >
      {children || title || pageTitle}
    </GatsbyLink>
  )
}

Link.propTypes = {
  id: propTypes.string,
  href: propTypes.string,
  className: propTypes.string,
  hash: propTypes.string,
  title: propTypes.string,
  target: propTypes.string,
  children: propTypes.node,
}
