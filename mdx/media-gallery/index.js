import React, { useState, useContext } from 'react'
import propTypes from 'prop-types'
import Carousel, { Modal, ModalGateway } from 'react-images'
import styled from '@emotion/styled'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import Grid from '@gatsby-mdx-suite/mdx-layout/grid'
import Image from '@gatsby-mdx-suite/mdx-image/image'

const MediaGalleryWrapper = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  @media (min-width: 800px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
`
const MediaGalleryItem = styled.div``
const MediaGalleryThumbnail = styled.a`
  display: block;
  cursor: pointer;
`

const StyledContainer = styled.div`
  position: absolute;
  background: #000;
  z-index: 1000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

const ViewWrapper = styled.div`
  position: relative;
  height: 100vh;
  box-sizing: border-box;
  padding: 60px 0;

  display: flex;
  align-items: center;
  justify-content: center;

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
      thumbnail: (
        <Image
          fluid={{
            ...post.localFile.childImageSharp.fluid,
            base64: post.localFile.childImageSharp.sqip.dataURI,
          }}
          objectFit="cover"
        />
      ),
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
        <Image
          fluid={{
            ...video.localThumbnail.childImageSharp.fluid,
            base64: video.localThumbnail.childImageSharp.sqip.dataURI,
          }}
          objectFit="cover"
        />
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

export default function MediaGallery({ children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { data } = useContext(MdxSuiteContext)

  const showItem = (index) => {
    setSelectedIndex(index)
    setModalIsOpen(true)
  }
  const toggleModal = () => setModalIsOpen(!modalIsOpen)

  const views = React.Children.map(children, (element) => {
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
  })

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
