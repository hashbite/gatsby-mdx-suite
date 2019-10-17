import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Link } from 'gatsby'

import I18nContext from '@gatsby-mdx-suite/contexts/i18n'
import LocationContext from '@gatsby-mdx-suite/contexts/location'
import {
  generatePageMap,
  getPageWithFallback,
} from '@gatsby-mdx-suite/i18n/helpers'

export default function ContentfulLink({
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

  const { pages } = useContext(LocationContext)
  const { active: activeLocale, default: defaultLocale } = useContext(
    I18nContext
  )

  if (!pages) {
    return null
  }

  const pageMap = generatePageMap({ pages, pageId: id })
  const page = getPageWithFallback({
    pageMap,
    locale: activeLocale,
    defaultLocale,
  })

  if (!page) {
    console.warn(
      `Unable to find contentful page with id ${id} and locale ${activeLocale}`
    )
    return null
  }

  const { slug, title: pageTitle, menuTitle } = page

  if (!slug) {
    console.error({ page })
    return null
  }

  const to = [page.path, hash ? `#${hash}` : null].filter(Boolean).join('')
  return (
    <Link
      type={type}
      className={className}
      activeClassName="active"
      to={to}
      target={target}
      {...linkProps}
    >
      {children || title || menuTitle || pageTitle}
    </Link>
  )
}

ContentfulLink.propTypes = {
  id: propTypes.string,
  href: propTypes.string,
  className: propTypes.string,
  hash: propTypes.string,
  title: propTypes.string,
  target: propTypes.string,
  children: propTypes.node,
  type: propTypes.string,
}
