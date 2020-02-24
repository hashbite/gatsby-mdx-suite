import React, { useContext } from 'react'
import styled from '@emotion/styled'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import MediaGallery from '@gatsby-mdx-suite/mdx-media-gallery'

import InstagramPost from './instagram-post'

const InstagramFeedWrapper = styled.div``

/**
 * A gallery of all imported instagram posts.
 *
 * Needs:
 * https://www.gatsbyjs.org/packages/gatsby-source-instagram/
 *
 * @example
 * <InstagramFeed />
 */
export default function InstagramFeed() {
  const {
    data: { instagramPosts },
  } = useContext(MdxSuiteContext)

  if (!instagramPosts) {
    console.warn(`No instagram posts found.`)
    return null
  }

  return (
    <InstagramFeedWrapper>
      <MediaGallery>
        {instagramPosts.map((post) => (
          <InstagramPost id={post.id} key={post.id} />
        ))}
      </MediaGallery>
    </InstagramFeedWrapper>
  )
}

InstagramFeed.propTypes = {}
