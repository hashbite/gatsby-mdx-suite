// import React from 'react'
import propTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import useDeepCompareEffect from 'use-deep-compare-effect'

import { useMDXDataDispatch } from '@gatsby-mdx-suite/contexts/mdx-data'

const ContentfulPageInjector = ({ children }) => {
  const mdxDataDispatch = useMDXDataDispatch()

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
    const contentfulPages = contentfulPagesResult.allContentfulPage.edges.map(
      ({ node }) => node
    )

    mdxDataDispatch({
      type: 'add',
      id: 'contentfulPages',
      data: contentfulPages,
    })
  }, [contentfulPagesResult])

  return children
}
ContentfulPageInjector.propTypes = {
  children: propTypes.node.isRequired,
}

export default ContentfulPageInjector
