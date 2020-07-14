import React from 'react'
import propTypes from 'prop-types'
import tw from 'twin.macro'
import { MDXProvider } from '@mdx-js/react'

import Box from '@gatsby-mdx-suite/mdx-boxes/box'
import Boxes from '@gatsby-mdx-suite/mdx-boxes/boxes'
import Font from '@gatsby-mdx-suite/mdx-copy/font'
import IconsContext from '@gatsby-mdx-suite/contexts/icons'
import Link from '@gatsby-mdx-suite/mdx-link/link'
import List from '@gatsby-mdx-suite/mdx-copy/list'
import ListItem from '@gatsby-mdx-suite/mdx-copy/list-item'
import TextBlock from '@gatsby-mdx-suite/mdx-copy/text-block'

import EntypoCheck from 'react-entypo-icons/lib/entypo/Check'
import EntypoControllerRecord from 'react-entypo-icons/lib/entypo/ControllerRecord'
import EntypoStar from 'react-entypo-icons/lib/entypo/Star'
import EntypoVinyl from 'react-entypo-icons/lib/entypo/Vinyl'

import Layout from '../components/layout/layout'
import LayoutMain from '../components/layout/main'

const ContentWrapper = tw.div`mx-auto max-w-6xl px-4 py-8`

const DocsPage = ({ children, pageContext }) => (
  <Layout title={pageContext.frontmatter.title}>
    <LayoutMain>
      <ContentWrapper>
        <IconsContext.Provider
          value={{
            check: { icon: EntypoCheck, scale: 1.2 },
            circle: { icon: EntypoVinyl, scale: 0.8 },
            dot: { icon: EntypoControllerRecord, scale: 0.8 },
            star: { icon: EntypoStar },
          }}
        >
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
        </IconsContext.Provider>
      </ContentWrapper>
    </LayoutMain>
  </Layout>
)

DocsPage.propTypes = {
  children: propTypes.node.isRequired,
  pageContext: propTypes.object.isRequired,
}

export default DocsPage
