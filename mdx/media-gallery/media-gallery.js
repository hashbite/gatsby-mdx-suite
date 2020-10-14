import React, { useState, useContext, useEffect } from 'react'
import propTypes from 'prop-types'
import Carousel, { Modal, ModalGateway } from 'react-images'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import Image from '@gatsby-mdx-suite/mdx-image/image'
import enhanceFluid from '@gatsby-mdx-suite/helpers/data/enhance-fluid'

const MediaGalleryWrapper = styled.div(
  ({ theme }) => css`
    ${tw`flex flex-wrap grid gap-grid-gap grid-cols-1 sm:grid-cols-2 md:grid-cols-3`}
  `
)

const MediaGalleryItem = styled.div``
const MediaGalleryThumbnail = tw.a`block cursor-pointer`

const StyledContainer = tw.div`absolute bg-black z-10 inset-0`

const ViewWrapper = styled.div`
  ${tw`relative h-screen py-8 flex items-center justify-center`}

  /* @todo replace this by settings property on gatsby-image */
  & .gatsby-image-wrapper {
    & img {
      object-fit: contain !important;
    }
  }
`

const View = ({ data, index, currentIndex }) => {
  return <ViewWrapper>{data.content}</ViewWrapper>
}

View.propTypes = {
  data: propTypes.object.isRequired,
  index: propTypes.number.isRequired,
  currentIndex: propTypes.number.isRequired,
}

const mediaParsers = {
  InstagramPost: ({ element, props, data }) => {
    const { id } = props
    const { instagramPosts } = data

    if (!instagramPosts) {
      return {
        id,
        thumbnail: null,
        content: null,
      }
    }

    const post = instagramPosts.find((post) => post.id === id)
    if (!post) {
      return {
        id,
        thumbnail: null,
        content: null,
      }
    }

    return {
      id,
      thumbnail: <Image fluid={enhanceFluid(post.localFile.childImageSharp)} />,
      content: element,
    }
  },
  YoutubeVideo: ({ element, props, data }) => {
    const { id } = props
    const { youtubeVideos } = data

    if (!youtubeVideos) {
      return {
        id,
        thumbnail: null,
        content: null,
      }
    }

    const video = youtubeVideos.find((video) => video.videoId === id)
    if (!video) {
      return {
        id,
        thumbnail: null,
        content: null,
      }
    }

    return {
      id,
      thumbnail: (
        <Image fluid={enhanceFluid(video.localThumbnail.childImageSharp)} />
      ),
      content: element,
    }
  },
  Image: ({ element, props }) => {
    const { id } = props

    return {
      id,
      thumbnail: element,
      content: element,
    }
  },
}

/**
 * Display (m)any different content types within a Gallery with full screen and multi touch support.
 *
 * Current can display:
 * * Images (`<Image />`)
 * * Youtube Videos (`<YoutubeVideo />`)
 * * Instagram Posts (`<InstagramPost />`)
 *
 * @example <caption>Images</caption>
 *
 * <MediaGallery>
 * <Image id="randomImageId" />
 * <Image id="randomImageId" />
 * <Image id="randomImageId" />
 * </MediaGallery>
 *
 * @example <caption>Instagram</caption>
 *
 * <MediaGallery>
 * <InstagramPost id="B16Tc2fBOMJ" />
 * <InstagramPost id="B0-s4uzBW6v" />
 * <InstagramPost id="BzimNxLByQk" />
 * </MediaGallery>
 *
 * @example <caption>Mixed</caption>
 *
 * <MediaGallery>
 * <InstagramPost id="randomInstagramPost" />
 * <YoutubeVideo id="randomYoutubeVideo" />
 * <Image id="randomImageId" />
 * </MediaGallery>
 */
export default function MediaGallery({ children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [views, setViews] = useState([])
  const { data } = useContext(MdxSuiteContext)

  const showItem = (index) => {
    setSelectedIndex(index)
    setModalIsOpen(true)
  }
  const toggleModal = () => setModalIsOpen(!modalIsOpen)

  useEffect(() => {
    setViews(
      React.Children.map(children, (element) => {
        if (typeof element !== 'object') {
          return null
        }

        const { props, type } = element
        const parserId = type.displayName
        const parser = mediaParsers[parserId]
        if (!parser) {
          console.error(
            new Error(`Unable to render media gallery item of type ${parserId}`)
          )
          return null
        }
        return parser({ element, props, data })
      }).filter(Boolean)
    )
  }, [data, children])

  if (!children) {
    return null
  }

  return (
    <MediaGalleryWrapper>
      {views.map((view, i) => (
        <MediaGalleryItem key={view.id}>
          <MediaGalleryThumbnail onClick={() => showItem(i)}>
            {view.thumbnail}
          </MediaGalleryThumbnail>
        </MediaGalleryItem>
      ))}
      <ModalGateway>
        {modalIsOpen ? (
          <Modal
            onClose={toggleModal}
            allowFullscreen={false}
            styles={{
              positioner: (base, state) => ({
                ...base,
                zIndex: 1000,
                background: 'red',
              }),
            }}
          >
            <Carousel
              views={views}
              components={{ View, Container: StyledContainer }}
              currentIndex={selectedIndex}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </MediaGalleryWrapper>
  )
}

MediaGallery.propTypes = {
  children: propTypes.node.isRequired,
}
