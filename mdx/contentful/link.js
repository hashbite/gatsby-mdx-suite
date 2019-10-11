import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Link } from 'gatsby'

import { useMDXDataState } from '@gatsby-mdx-suite/contexts/mdx-data'
import i18nContext from '@gatsby-mdx-suite/contexts/i18n'
import createPath from '@gatsby-mdx-suite/i18n/create-path'

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

  const { contentfulPages } = useMDXDataState()
  const { active: activeLocale } = useContext(i18nContext)

  if (!contentfulPages) {
    return null
  }

  const page = contentfulPages.find(
    (page) => page.contentful_id === id && page.node_locale === activeLocale
  )

  // @todo merge page discovery logic with language selection component
  if (!page) {
    console.warn(
      `Unable to find contentful page with id ${id} and locale ${activeLocale}`
    )
    return null
  }

  const { slug, node_locale: locale, title: pageTitle } = page

  if (!slug) {
    console.error({ page })
    return null
  }

  const path = createPath({ slug, locale })
  const to = [path, hash ? `#${hash}` : null].filter(Boolean).join('')
  return (
    <Link
      type={type}
      className={className}
      activeClassName="active"
      to={to}
      target={target}
      {...linkProps}
    >
      {children || title || pageTitle}
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
