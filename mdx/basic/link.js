import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'

import I18nContext from '@gatsby-mdx-suite/contexts/i18n'
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
  type,
  ...linkProps
}) {
  if (type) {
    className = [className, `nohover`].filter(Boolean).join(' ')
  }
  if (href) {
    return (
      <a type={type} className={className} href={href} target={target}>
        {children || title}
      </a>
    )
  }

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

  const pages = result.allSitePage.nodes

  const { active: activeLocale, default: defaultLocale } = useContext(
    I18nContext
  )

  if (!pages) {
    return null
  }

  const pageMap = generatePageMap({ pages, activePageId: id })

  const page = getPageWithFallback({
    pageMap,
    locale: activeLocale,
    defaultLocale,
  })

  if (!page) {
    console.warn(
      `Unable to find page with id ${id} and locale ${activeLocale} including fallbacks`,
      pageMap
    )
    return null
  }

  const { path, title: pageTitle } = page

  if (!path) {
    console.error('Found page does not have any path to link to', page)
    return null
  }

  const to = [path, hash ? `#${hash}` : null].filter(Boolean).join('')
  return (
    <GatsbyLink
      type={type}
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
  type: propTypes.string,
}
