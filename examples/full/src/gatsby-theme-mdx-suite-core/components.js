import defaultComponents from 'gatsby-theme-mdx-suite-base/src/gatsby-theme-mdx-suite-core/components'

// Special layout components
import FloatingImage from '@gatsby-mdx-suite/mdx-layout/floating-image'
import Boxes from '@gatsby-mdx-suite/mdx-boxes/boxes'
import Box from '@gatsby-mdx-suite/mdx-boxes/box'
import BoxVideo from '@gatsby-mdx-suite/mdx-boxes/box-video'
import BoxCarousel from '@gatsby-mdx-suite/mdx-boxes/box-carousel'
import BoxCarouselSlide from '@gatsby-mdx-suite/mdx-boxes/box-carousel-slide'
import Timeline from '@gatsby-mdx-suite/mdx-timeline/timeline'
import TimelineEntry from '@gatsby-mdx-suite/mdx-timeline/timeline-entry'

// Video support
import Video from '@gatsby-mdx-suite/mdx-video/video'
import YoutubeVideo from '@gatsby-mdx-suite/mdx-youtube/youtube-video'
import VimeoVideo from '@gatsby-mdx-suite/mdx-vimeo/vimeo-video'

// Modal support
import Modal from '@gatsby-mdx-suite/mdx-modal/modal'

// Scroll effects
import Anchor from '@gatsby-mdx-suite/mdx-scroll-effects/anchor'
import AnchorHook from '@gatsby-mdx-suite/mdx-scroll-effects/anchor-hook'
import SectionZoom from '@gatsby-mdx-suite/mdx-scroll-effects/section-zoom'
import Parallax from '@gatsby-mdx-suite/mdx-scroll-effects/parallax'

// Integrations
import MailchimpSignup from '@gatsby-mdx-suite/mdx-mailchimp/mailchimp-signup'

// Shadowed components
import NavBar from 'gatsby-theme-mdx-suite-base/src/components/mdx/navbar'

export default {
  ...defaultComponents,
  // Special layout
  FloatingImage,
  Boxes,
  Box,
  BoxVideo,
  BoxCarousel,
  BoxCarouselSlide,
  Timeline,
  TimelineEntry,
  // Modal
  Modal,
  // Video
  Video,
  YoutubeVideo,
  VimeoVideo,
  // Scroll effects
  Anchor,
  AnchorHook,
  SectionZoom,
  Parallax,
  // Integrations
  MailchimpSignup,
  // Project specific
  NavBar, // Overwrites default NavBar
}
