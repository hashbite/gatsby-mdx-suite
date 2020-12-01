import defaultComponents from 'gatsby-theme-mdx-suite-base/src/gatsby-theme-mdx-suite-core/components'

// Basics
import Video from '@gatsby-mdx-suite/mdx-video/video-renderer'
import YoutubeVideo from '@gatsby-mdx-suite/mdx-youtube/youtube-video'
import VimeoVideo from '@gatsby-mdx-suite/mdx-vimeo/vimeo-video'

// Project specific components
import NavBar from 'gatsby-theme-mdx-suite-base/src/components/mdx/navbar'

export default {
  ...defaultComponents,
  Video,
  NavBar,
  YoutubeVideo,
  VimeoVideo,
}
