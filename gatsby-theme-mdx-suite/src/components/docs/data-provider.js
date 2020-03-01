import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import propTypes from 'prop-types'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

const DocsDataProvider = ({ children }) => {
  const MdxSuiteData = useContext(MdxSuiteContext)
  const assetResults = useStaticQuery(graphql`
    query KitchenSinkComponent {
      images: allContentfulAsset(
        filter: { file: { contentType: { regex: "/^image/" } } }
        limit: 100
      ) {
        nodes {
          ...MdxSuiteContentfulAsset
          fluid(maxWidth: 320, quality: 60) {
            ...GatsbyContentfulFluid
          }
        }
      }
      videos: allContentfulAsset(
        filter: { file: { contentType: { regex: "/^video/" } } }
        limit: 5
      ) {
        nodes {
          ...MdxSuiteContentfulAsset
          videoH264(fps: 15, duration: 3, preset: "ultrafast", maxWidth: 600) {
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
                ...GatsbyImageSharpFluid
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
                ...GatsbyImageSharpFluid
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
