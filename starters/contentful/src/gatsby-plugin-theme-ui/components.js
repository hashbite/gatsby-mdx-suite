// Basics
const Image = require('@gatsby-mdx-suite/mdx-image/image')
const CTA = require('@gatsby-mdx-suite/mdx-link/cta')
const Link = require('@gatsby-mdx-suite/mdx-link/link')
const Video = require('@gatsby-mdx-suite/mdx-video/video')

// Layout
const Gap = require('@gatsby-mdx-suite/mdx-layout/gap')
const Center = require('@gatsby-mdx-suite/mdx-layout/center')
const Section = require('@gatsby-mdx-suite/mdx-layout/section')
const Viewport = require('@gatsby-mdx-suite/mdx-layout/viewport')
const Columns = require('@gatsby-mdx-suite/mdx-layout/columns')
const Grid = require('@gatsby-mdx-suite/mdx-layout/grid')
const FloatingImage = require('@gatsby-mdx-suite/mdx-layout/floating-image')

// Boxes
const Boxes = require('@gatsby-mdx-suite/mdx-boxes/boxes')
const Box = require('@gatsby-mdx-suite/mdx-boxes/box')
const BoxVideo = require('@gatsby-mdx-suite/mdx-boxes/box-video')
const BoxCarousel = require('@gatsby-mdx-suite/mdx-boxes/box-carousel')
const BoxCarouselSlide = require('@gatsby-mdx-suite/mdx-boxes/box-carousel-slide')

// Copy
const ResponsiveText = require('@gatsby-mdx-suite/mdx-copy/responsive-text')
const Text = require('@gatsby-mdx-suite/mdx-copy/text')

// Special components
const Timeline = require('@gatsby-mdx-suite/mdx-timeline/timeline').Timeline
const TimelineEntry = require('@gatsby-mdx-suite/mdx-timeline/timeline')
  .TimelineEntry

// Project specific components
const BlogPostListing = require('../components/mdx/blog-post-listing')
const Header = require('../components/mdx/header')

module.exports = {
  Columns,
  Grid,
  Section,
  Viewport,
  FloatingImage,
  Image,
  Link,
  Boxes,
  Box,
  BoxVideo,
  Gap,
  Center,
  ResponsiveText,
  Text,
  Timeline,
  TimelineEntry,
  BlogPostListing,
  Header,
  CTA,
  Video,
  BoxCarousel,
  BoxCarouselSlide,
}
