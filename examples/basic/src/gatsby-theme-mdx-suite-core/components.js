import defaultComponents from 'gatsby-theme-mdx-suite-base/src/gatsby-theme-mdx-suite-core/components'

// Basics
import Video from '@gatsby-mdx-suite/mdx-video/video-renderer'
import YoutubeVideo from '@gatsby-mdx-suite/mdx-youtube/youtube-video'
import VimeoVideo from '@gatsby-mdx-suite/mdx-vimeo/vimeo-video'

// Project specific components
// @todo header might be a bad example?
import Header from 'gatsby-theme-mdx-suite-base/src/components/header/header'

export default {
  ...defaultComponents,
  Video,
  Header,
  YoutubeVideo,
  VimeoVideo,
}
