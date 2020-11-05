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
import Hide from '@gatsby-mdx-suite/mdx-layout/hide'

// Copy
import List from '@gatsby-mdx-suite/mdx-copy/list'
import ListItem from '@gatsby-mdx-suite/mdx-copy/list-item'
import Font from '@gatsby-mdx-suite/mdx-copy/font'
import TextBlock from '@gatsby-mdx-suite/mdx-copy/text-block'
import ResponsiveTextBlock from '@gatsby-mdx-suite/mdx-copy/responsive-text-block'
import Claim from '@gatsby-mdx-suite/mdx-copy/claim'
import Icon from '@gatsby-mdx-suite/mdx-copy/icon'

const components = {
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
  // Overwrite standard html elements with our custom components
  ul: (props) => <List type="unordered" {...props} />,
  ol: (props) => <List type="ordered" {...props} />,
}

export default components
