import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'

function SEO({ description, lang, meta, title, ogImage, twitterImage, url }) {
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

  return (
    <Location>
      {({ location }) => (
        <Helmet
          htmlAttributes={{
            lang,
          }}
          title={title}
          titleTemplate={`%s | ${site.siteMetadata.title}`}
          meta={[
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
            .concat(meta)}
        />
      )}
    </Location>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  ogImage: ``,
  twitterImage: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  ogImage: PropTypes.string,
  twitterImage: PropTypes.string,
  url: PropTypes.string,
}

export default SEO
