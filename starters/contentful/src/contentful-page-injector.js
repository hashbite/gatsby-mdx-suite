// import React from 'react'
import propTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import useDeepCompareEffect from 'use-deep-compare-effect'

import { useMDXDataDispatch } from '@gatsby-mdx-suite/contexts/mdx-data'

const ContentfulPageInjector = ({ children }) => {
  console.log('render injector')
  const mdxDataDispatch = useMDXDataDispatch()

  const contentfulPagesResult = useStaticQuery(graphql`
    {
      allContentfulPage(limit: 1000) {
        edges {
          node {
            id
            slug
            node_locale
            title
            menuTitle
          }
        }
      }
    }
  `)

  const contentfulPages = contentfulPagesResult.allContentfulPage.edges.map(
    ({ node }) => node
  )

  useDeepCompareEffect(() => {
    mdxDataDispatch({
      type: 'add',
      id: 'contentfulPages',
      data: contentfulPages,
    })
  }, [contentfulPages])

  return children
}
ContentfulPageInjector.propTypes = {
  children: propTypes.node.isRequired,
}

export default ContentfulPageInjector
