import React from 'react'

// Basics
import CTA from '@gatsby-mdx-suite/mdx-link/cta'
import Image from '@gatsby-mdx-suite/mdx-image/image'
import Link from '@gatsby-mdx-suite/mdx-link/link'
import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'

// Layout
import Center from '@gatsby-mdx-suite/mdx-layout/center'
import Columns from '@gatsby-mdx-suite/mdx-layout/columns'
import Column from '@gatsby-mdx-suite/mdx-layout/column'
import Gap from '@gatsby-mdx-suite/mdx-layout/gap'
import Grid from '@gatsby-mdx-suite/mdx-layout/grid'
import Section from '@gatsby-mdx-suite/mdx-layout/section'

// Modifiers
import Hide from '@gatsby-mdx-suite/mdx-layout/hide'
import Offset from '@gatsby-mdx-suite/mdx-layout/offset'
import Parallax from '@gatsby-mdx-suite/mdx-layout/parallax'

// Copy
import List from '@gatsby-mdx-suite/mdx-copy/list'
import ListItem from '@gatsby-mdx-suite/mdx-copy/list-item'
import Font from '@gatsby-mdx-suite/mdx-copy/font'
import TextBlock from '@gatsby-mdx-suite/mdx-copy/text-block'
import ResponsiveTextBlock from '@gatsby-mdx-suite/mdx-copy/responsive-text-block'
import Claim from '@gatsby-mdx-suite/mdx-copy/claim'
import Icon from '@gatsby-mdx-suite/mdx-copy/icon'

// Animation
import Animate from '@gatsby-mdx-suite/mdx-animation/animate'

const components = {
  Animate,
  Center,
  Claim,
  ColorSet,
  Column,
  Columns,
  CTA,
  Font,
  Gap,
  Grid,
  Icon,
  Image,
  Link,
  List,
  ListItem,
  ResponsiveTextBlock,
  Section,
  TextBlock,
  Hide,
  Offset,
  Parallax,
  // Overwrite standard html elements with our custom components
  ul: (props) => <List type="unordered" {...props} />,
  ol: (props) => <List type="ordered" {...props} />,
  li: (props) => <ListItem {...props} />,
  h1: (props) => (
    <Claim tag="h1" fontSizeMin="1.75rem" fontSizeMax="2.25rem" {...props} />
  ),
  h2: (props) => (
    <Claim tag="h2" fontSizeMin="1.5rem" fontSizeMax="1.875rem" {...props} />
  ),
  h3: (props) => (
    <Claim tag="h3" fontSizeMin="1.25rem" fontSizeMax="1.5rem" {...props} />
  ),
  h4: (props) => (
    <Claim tag="h4" fontSizeMin="1.125rem" fontSizeMax="1.25rem" {...props} />
  ),
  h5: (props) => (
    <Claim tag="h5" fontSizeMin="1rem" fontSizeMax="1.125rem" {...props} />
  ),
  h6: (props) => (
    <Claim tag="h6" fontSizeMin="1rem" fontSizeMax="1.1rem" {...props} />
  ),
  p: (props) => <TextBlock {...props} />,
  img: (props) => <Image {...props} />,
}

export default components
