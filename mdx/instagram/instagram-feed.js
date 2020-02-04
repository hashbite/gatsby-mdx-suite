import React, { useContext } from 'react'
import styled from '@emotion/styled'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import MediaGallery from '@gatsby-mdx-suite/mdx-media-gallery'

import InstagramPost from './instagram-post'

const InstagramFeedWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-wrap: wrap;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: ${({ theme }) => theme.spacing.s2}px;

  @media (min-width: 800px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  & a {
    position: relative;
    display: block;
    flex: 1 0 33%;
    justify-content: space-between;

    &:before {
      content: '';
      display: block;
      padding-top: 100%;
    }

    & .gatsby-image-wrapper {
      position: absolute !important;
      z-index: 1;

      top: ${({ theme }) => theme.spacing.s1}px;
      left: ${({ theme }) => theme.spacing.s1}px;
      right: ${({ theme }) => theme.spacing.s1}px;
      bottom: ${({ theme }) => theme.spacing.s1}px;
    }
  }
`

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
