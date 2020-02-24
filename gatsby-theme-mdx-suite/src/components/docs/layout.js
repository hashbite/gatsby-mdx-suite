import React, { useContext } from 'react'
import { useStaticQuery } from 'gatsby'
import Link from 'gatsby-link'
import propTypes from 'prop-types'
import { Global, css } from '@emotion/core'
import { Styled } from 'theme-ui'
import tw from 'twin.macro'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

const DocsHeader = tw.div`
  fixed left-0 top-0 right-0 z-50
  h-16 px-4 flex justify-between items-center
  bg-gray-800 text-white shadow-lg
`

const DocsTitle = tw.h1`m-0`

const DocsWrapper = tw.div`pt-24`

const MenuLink = tw(Link)`px-4`

const Menu = tw.nav`flex content-center`

const Layout = ({ children }) => {
  const MdxSuiteData = useContext(MdxSuiteContext)
  const assetResults = useStaticQuery(graphql`
    query KitchenSinkComponent {
      images: allContentfulAsset(
        filter: { file: { contentType: { regex: "/^image/" } } }
      ) {
        nodes {
          ...MdxSuiteContentfulAsset
          fluid(maxWidth: 1980) {
            ...GatsbyContentfulFluid
          }
        }
      }
      videos: allContentfulAsset(
        filter: { file: { contentType: { regex: "/^video/" } } }
      ) {
        nodes {
          ...MdxSuiteContentfulAsset
          videoH264(fps: 15, duration: 3) {
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
    <Styled.root>
      <Global
        styles={() => css`
          body {
            margin: 0;
            overflow-x: hidden;
          }
          a {
            color: inherit;
            text-decoration: none;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          ul,
          ol,
          li {
            &:last-child {
              margin-bottom: 0;
            }
          }

          ul,
          ol {
            margin-left: 0;
          }
        `}
      />
      <MdxSuiteContext.Provider
        value={{
          ...MdxSuiteData,
          data: {
            images: assetResults.images.nodes || [],
            floating: assetResults.images.nodes || [],
            background: assetResults.images.nodes || [],
            youtubeVideos: assetResults.youtubeVideos.nodes || [],
            instagramPosts: assetResults.instagramPosts.nodes || [],
            videos: (assetResults.videos.nodes || []).map(
              ({ assetId, locale, videoH264 }) => ({
                assetId,
                locale,
                h264: videoH264.path,
              })
            ),
          },
        }}
      >
        <DocsHeader>
          <DocsTitle>
            <Link to="/docs">Docs</Link>
          </DocsTitle>
          <Menu>
            <MenuLink to="/docs/kitchen-sink">Kitchen Sink</MenuLink>
            <MenuLink to="/docs/theme">theme</MenuLink>
            <MenuLink to="/">Back to the page</MenuLink>
          </Menu>
        </DocsHeader>
        <DocsWrapper>{children}</DocsWrapper>
      </MdxSuiteContext.Provider>
    </Styled.root>
  )
}

Layout.propTypes = {
  children: propTypes.node.isRequired,
}

export default Layout
