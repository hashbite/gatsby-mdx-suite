import defaultComponents from 'gatsby-theme-mdx-suite-base/src/gatsby-theme-mdx-suite-core/components'

// Special layout components
import FloatingImage from '@gatsby-mdx-suite/mdx-layout/floating-image'
import Boxes from '@gatsby-mdx-suite/mdx-boxes/boxes'
import Box from '@gatsby-mdx-suite/mdx-boxes/box'
import BoxVideo from '@gatsby-mdx-suite/mdx-boxes/box-video'
import BoxCarousel from '@gatsby-mdx-suite/mdx-boxes/box-carousel'
import BoxCarouselSlide from '@gatsby-mdx-suite/mdx-boxes/box-carousel-slide'

// Video support
import Video from '@gatsby-mdx-suite/mdx-video/video'
import YoutubeVideo from '@gatsby-mdx-suite/mdx-youtube/youtube-video'
import VimeoVideo from '@gatsby-mdx-suite/mdx-vimeo/vimeo-video'

// Modal support
import Modal from '@gatsby-mdx-suite/mdx-modal/modal'

// Add some basic scroll effects
import Anchor from '@gatsby-mdx-suite/mdx-scroll-effects/anchor'
import AnchorHook from '@gatsby-mdx-suite/mdx-scroll-effects/anchor-hook'

// Project specific components
import Header from 'gatsby-theme-mdx-suite-base/src/components/header/header'
import CustomComponent from '../components/custom-component'

export default {
  ...defaultComponents,
  // Special layout
  FloatingImage,
  Boxes,
  Box,
  BoxVideo,
  BoxCarousel,
  BoxCarouselSlide,
  // Modal
  Modal,
  // Video
  Video,
  YoutubeVideo,
  VimeoVideo,
  // Scroll effects
  Anchor,
  AnchorHook,
  // Project specific
  Header,
  CustomComponent,
}
