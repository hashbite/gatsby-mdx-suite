import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import propTypes from 'prop-types'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

const DocsDataProvider = ({ children }) => {
  const MdxSuiteData = useContext(MdxSuiteContext)
  const assetResults = useStaticQuery(graphql`
    query DocsAssetData {
      images: allContentfulAsset(
        filter: { file: { contentType: { regex: "/^image/" } } }
      ) {
        nodes {
          ...MdxSuiteContentfulAsset
          fluid(maxWidth: 320, quality: 60) {
            ...GatsbyContentfulFluid_noBase64
          }
        }
      }
      videos: allContentfulAsset(
        filter: { file: { contentType: { regex: "/^video/" } } }
      ) {
        nodes {
          ...MdxSuiteContentfulAsset
          videoH264(fps: 12, duration: 1, preset: "ultrafast", maxWidth: 300) {
            path
          }
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

  return (
    <MdxSuiteContext.Provider
      value={{
        ...MdxSuiteData,
        data: {
          images: assetResults.images.nodes || [],
          floating: assetResults.images.nodes || [],
          background: assetResults.images.nodes || [],
          youtubeVideos: assetResults.youtubeVideos.nodes || [],
          instagramPosts: assetResults.instagramPosts.nodes || [],
          videos: assetResults.videos.nodes || [],
        },
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
