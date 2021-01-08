import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import propTypes from 'prop-types'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import mergeContextData from '@gatsby-mdx-suite/helpers/data/merge-context-data'

const DocsDataProvider = ({ children }) => {
  const MdxSuiteData = useContext(MdxSuiteContext)
  const assetResults = useStaticQuery(graphql`
    query DocsAssetData {
      screen: allContentfulAsset {
        nodes {
          ...MdxSuiteMediaDocs
        }
      }
      full: allContentfulAsset {
        nodes {
          ...MdxSuiteMediaDocs
        }
      }
      half: allContentfulAsset {
        nodes {
          ...MdxSuiteMediaDocs
        }
      }
      third: allContentfulAsset {
        nodes {
          ...MdxSuiteMediaDocs
        }
      }
      quarter: allContentfulAsset {
        nodes {
          ...MdxSuiteMediaDocs
        }
      }
      sixth: allContentfulAsset {
        nodes {
          ...MdxSuiteMediaDocs
        }
      }
      eigth: allContentfulAsset {
        nodes {
          ...MdxSuiteMediaDocs
        }
      }
      docs: allContentfulAsset {
        nodes {
          ...MdxSuiteMediaDocs
        }
      }
    }
  `)

  const mediaCollections = Object.keys(assetResults).reduce(
    (collections, mediaCollection) => ({
      ...collections,
      [mediaCollection]: assetResults[mediaCollection].nodes,
    }),
    {}
  )

  return (
    <MdxSuiteContext.Provider
      value={mergeContextData(MdxSuiteData, {
        pageContext: {
          locale: MdxSuiteData.themeConfig.defaultLocale,
          title: 'docs',
        },
        data: mediaCollections,
      })}
    >
      {children}
    </MdxSuiteContext.Provider>
  )
}

DocsDataProvider.propTypes = {
  children: propTypes.node.isRequired,
}

export default DocsDataProvider
