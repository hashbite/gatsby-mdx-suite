import React, { useContext, useState } from 'react'
import propTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import useDeepCompareEffect from 'use-deep-compare-effect'

import LocationContext from '@gatsby-mdx-suite/contexts/location'
import { createPath } from '@gatsby-mdx-suite/i18n/helpers'

const ContentfulPageInjector = ({ children }) => {
  const [pages, setPages] = useState(null)
  const locationData = useContext(LocationContext)

  const contentfulPagesResult = useStaticQuery(graphql`
    {
      allContentfulPage(limit: 1000) {
        edges {
          node {
            contentful_id
            node_locale
            slug
            title
            menuTitle
          }
        }
      }
    }
  `)

  useDeepCompareEffect(() => {
    setPages(
      contentfulPagesResult.allContentfulPage.edges.map(
        ({
          node: {
            contentful_id: id,
            node_locale: locale,
            slug,
            title,
            menuTitle,
          },
        }) => ({
          id,
          locale,
          slug,
          title,
          menuTitle,
          path: createPath({ locale, slug }),
        })
      )
    )
  }, [contentfulPagesResult])

  if (!pages) {
    return null
  }

  return (
    <LocationContext.Provider value={{ ...locationData, pages }}>
      {children}
    </LocationContext.Provider>
  )
}
ContentfulPageInjector.propTypes = {
  children: propTypes.node.isRequired,
}

export default ContentfulPageInjector
