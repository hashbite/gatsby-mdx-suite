import defaultComponents from 'gatsby-theme-mdx-suite-base/src/gatsby-theme-mdx-suite-core/components'

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
