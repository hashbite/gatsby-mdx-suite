import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { useLocation } from '@reach/router'
import { useHead, useTitleTemplate } from 'hoofd'

function SEO({
  description,
  language,
  meta,
  title,
  titleTemplate,
  ogImage,
  twitterImage,
  url,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaUrl = url || site.siteMetadata.siteUrl
  const location = useLocation()
  const siteTitle = site.siteMetadata.title

  if (!title) {
    title = siteTitle
  }

  const metas = useMemo(
    () =>
      [
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: 'og:url',
          content: `${metaUrl}/${location.pathname}`,
        },
        ogImage && {
          property: 'og:image',
          content: ogImage,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        twitterImage && {
          property: 'twitter:image:src',
          content: twitterImage,
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
        {
          name: 'format-detection',
          content: 'telephone=no',
        },
      ]
        .filter(Boolean)
        .concat(meta),
    [
      location.pathname,
      meta,
      metaDescription,
      metaUrl,
      ogImage,
      title,
      twitterImage,
    ]
  )

  useTitleTemplate(
    titleTemplate || (title !== siteTitle && `%s | ${siteTitle}`)
  )

  useHead({
    title,
    language,
    metas,
  })

  return null
}

SEO.defaultProps = {
  language: `en`,
  meta: [],
  description: ``,
  ogImage: ``,
  twitterImage: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  language: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  ogImage: PropTypes.string,
  twitterImage: PropTypes.string,
  url: PropTypes.string,
  titleTemplate: PropTypes.string,
}

export default SEO
