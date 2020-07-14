import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import propTypes from 'prop-types'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

const DocsDataProvider = ({ children }) => {
  const MdxSuiteData = useContext(MdxSuiteContext)
  const assetResults = useStaticQuery(graphql`
    query DocsAssetData {
      screen: allContentfulAsset {
        nodes {
          ...MdxSuiteMediaCollectionScreenDocs
        }
      }
      full: allContentfulAsset {
        nodes {
          ...MdxSuiteMediaCollectionFullDocs
        }
      }
      half: allContentfulAsset {
        nodes {
          ...MdxSuiteMediaCollectionHalfDocs
        }
      }
      third: allContentfulAsset {
        nodes {
          ...MdxSuiteMediaCollectionThirdDocs
        }
      }
      quarter: allContentfulAsset {
        nodes {
          ...MdxSuiteMediaCollectionQuarterDocs
        }
      }
      sixth: allContentfulAsset {
        nodes {
          ...MdxSuiteMediaCollectionSixthDocs
        }
      }
      eigth: allContentfulAsset {
        nodes {
          ...MdxSuiteMediaCollectionEigthDocs
        }
      }
      youtubeVideos: allYoutubeVideo {
        nodes {
          videoId
          title
          localThumbnail {
            url
            childImageSharp {
              fluid(maxWidth: 320, maxHeight: 280) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
      instagramPosts: allInstaNode {
        nodes {
          id
          localFile {
            url
            childImageSharp {
              fluid(maxWidth: 320, maxHeight: 320) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
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
      value={{
        ...MdxSuiteData,
        pageContext: {
          locale: MdxSuiteData.themeConfig.defaultLocale,
          title: 'docs',
        },
        data: mediaCollections,
      }}
    >
      {children}
    </MdxSuiteContext.Provider>
  )
}

DocsDataProvider.propTypes = {
  children: propTypes.node.isRequired,
}

export default DocsDataProvider
