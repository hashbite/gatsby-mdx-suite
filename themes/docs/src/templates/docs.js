import React from 'react'
import propTypes from 'prop-types'
import tw from 'twin.macro'
import { MDXProvider } from '@mdx-js/react'

import Box from '@gatsby-mdx-suite/mdx-boxes/box'
import Boxes from '@gatsby-mdx-suite/mdx-boxes/boxes'
import Font from '@gatsby-mdx-suite/mdx-copy/font'
import Link from '@gatsby-mdx-suite/mdx-link/link-renderer'
import List from '@gatsby-mdx-suite/mdx-copy/list'
import ListItem from '@gatsby-mdx-suite/mdx-copy/list-item'
import TextBlock from '@gatsby-mdx-suite/mdx-copy/text-block'

import Layout from '../components/layout/layout'
import LayoutMain from '../components/layout/main'

const ContentWrapper = tw.div`mx-auto max-w-6xl px-4 py-8`

const DocsPage = ({ children, pageContext }) => (
  <Layout title={pageContext.frontmatter.title}>
    <LayoutMain>
      <ContentWrapper>
        <MDXProvider
          components={{
            Box,
            Boxes,
            Font,
            Link,
            List,
            ListItem,
            TextBlock,
          }}
        >
          {children}
        </MDXProvider>
      </ContentWrapper>
    </LayoutMain>
  </Layout>
)

DocsPage.propTypes = {
  children: propTypes.node.isRequired,
  pageContext: propTypes.object.isRequired,
}

export default DocsPage
