// Basics
import CTA from '@gatsby-mdx-suite/mdx-link/cta'
import Image from '@gatsby-mdx-suite/mdx-image/image'
import Link from '@gatsby-mdx-suite/mdx-link/link'
import Video from '@gatsby-mdx-suite/mdx-video/video'

// Layout
import Center from '@gatsby-mdx-suite/mdx-layout/center'
import Columns from '@gatsby-mdx-suite/mdx-layout/columns'
import FloatingImage from '@gatsby-mdx-suite/mdx-layout/floating-image'
import Gap from '@gatsby-mdx-suite/mdx-layout/gap'
import Grid from '@gatsby-mdx-suite/mdx-layout/grid'
import NarrowSection from '@gatsby-mdx-suite/mdx-layout/narrow-section'
import Section from '@gatsby-mdx-suite/mdx-layout/section'
import Viewport from '@gatsby-mdx-suite/mdx-layout/viewport'

// Boxes
import Boxes from '@gatsby-mdx-suite/mdx-boxes/boxes'
import Box from '@gatsby-mdx-suite/mdx-boxes/box'
import BoxCarousel from '@gatsby-mdx-suite/mdx-boxes/box-carousel'
import BoxCarouselSlide from '@gatsby-mdx-suite/mdx-boxes/box-carousel-slide'
import BoxVideo from '@gatsby-mdx-suite/mdx-boxes/box-video'

// Copy
import List from '@gatsby-mdx-suite/mdx-copy/list'
import ResponsiveText from '@gatsby-mdx-suite/mdx-copy/responsive-text'
import Text from '@gatsby-mdx-suite/mdx-copy/text'

// Decorations
import Card from '@gatsby-mdx-suite/mdx-decoration/card'

// Form
import ContactForm from '@gatsby-mdx-suite/mdx-form/contact-form'

// Social Media
import BandcampTrack from '@gatsby-mdx-suite/mdx-bandcamp/bandcamp-track'
import InstagramFeed from '@gatsby-mdx-suite/mdx-instagram/instagram-feed'
import InstagramPost from '@gatsby-mdx-suite/mdx-instagram/instagram-post'
import YoutubeFeed from '@gatsby-mdx-suite/mdx-youtube/youtube-feed'
import YoutubeVideo from '@gatsby-mdx-suite/mdx-youtube/youtube-video'

// Special use-case components
import Timeline from '@gatsby-mdx-suite/mdx-timeline/timeline'
import TimelineEntry from '@gatsby-mdx-suite/mdx-timeline/timeline-entry'
import MediaGallery from '@gatsby-mdx-suite/mdx-media-gallery/media-gallery'

// Animation
import Animate from '@gatsby-mdx-suite/mdx-animation/animate'

// Project specific components
import BlogPostListing from '../components/mdx/blog-post-listing'
import Header from '../components/mdx/header'

export default {
  Animate,
  BandcampTrack,
  BlogPostListing,
  Box,
  BoxCarousel,
  BoxCarouselSlide,
  Boxes,
  BoxVideo,
  Card,
  Center,
  Columns,
  ContactForm,
  CTA,
  FloatingImage,
  Gap,
  Grid,
  Header,
  Image,
  InstagramFeed,
  InstagramPost,
  Link,
  List,
  MediaGallery,
  NarrowSection,
  ResponsiveText,
  Section,
  Text,
  Timeline,
  TimelineEntry,
  Video,
  Viewport,
  YoutubeFeed,
  YoutubeVideo,
  // Overwrite standard components with our styled ones
  ul: List,
}
