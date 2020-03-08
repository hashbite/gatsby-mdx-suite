import React from 'react'
import propTypes from 'prop-types'
import tw from 'twin.macro'

import Layout from '../components/docs/layout/layout'
import LayoutMain from '../components/docs/layout/main'

const ContentWrapper = tw.div`mx-auto max-w-6xl px-4 py-8`

const DocsPage = ({ children, pageContext }) => (
  <Layout title={pageContext.frontmatter.title}>
    <LayoutMain>
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutMain>
  </Layout>
)

DocsPage.propTypes = {
  children: propTypes.node.isRequired,
  pageContext: propTypes.object.isRequired,
}

export default DocsPage
