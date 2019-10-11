import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Link } from 'gatsby'

import { useMDXDataState } from '@gatsby-mdx-suite/contexts/mdx-data'
import i18nContext from '@gatsby-mdx-suite/contexts/i18n'

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
    console.warn(
      `Unable to find any contentful page. Did you fill the context?`
    )
    return null
  }

  console.log({ contentfulPages, id, activeLocale })

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

  const { path, title: pageTitle } = page
  if (!path) {
    console.error({ page })
  }
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
