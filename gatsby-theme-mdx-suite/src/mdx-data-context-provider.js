import React from 'react'
import propTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'
import useDeepCompareEffect from 'use-deep-compare-effect'

import { useMDXDataDispatch } from '@gatsby-mdx-suite/contexts/mdx-data'

export default function MdxDataContextProvider({ children, themeConfig }) {
  const mdxDataDispatch = useMDXDataDispatch()

  if (themeConfig.instagram) {
    const data = useStaticQuery(graphql`
      query MdxDataQuery {
        allInstaNode(sort: { order: DESC, fields: timestamp }, limit: 9) {
          edges {
            node {
              ...GatsbyMdxSuiteInstaNode_withSqip
            }
          }
        }
      }
    `)
    const instagramPosts = data.allInstaNode.edges.map(({ node }) => node)
    useDeepCompareEffect(() => {
      mdxDataDispatch({
        type: 'add',
        id: 'instagramPosts',
        data: instagramPosts,
      })
    }, [instagramPosts])
  }

  return <div>{children}</div>
}

MdxDataContextProvider.propTypes = {
  children: propTypes.element.isRequired,
  themeConfig: propTypes.object.isRequired,
}
