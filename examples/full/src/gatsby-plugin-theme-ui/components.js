import defaultComponents from 'gatsby-theme-mdx-suite-base/src/gatsby-plugin-theme-ui/components'

// Basics
import Video from '@gatsby-mdx-suite/mdx-video/video'

// Project specific components
import Header from 'gatsby-theme-mdx-suite-base/src/components/header/header'
import CustomComponent from '../components/custom-component'

export default {
  ...defaultComponents,
  Video,
  Header,
  CustomComponent,
}
