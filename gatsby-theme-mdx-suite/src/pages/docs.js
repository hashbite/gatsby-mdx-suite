import React from 'react'
import { Link } from 'gatsby'
import { Styled } from 'theme-ui'
import tw from 'twin.macro'

import Layout from '../components/docs/layout/layout'
import LayoutMain from '../components/docs/layout/main'

const ContentWrapper = tw.div`mx-auto max-w-6xl px-4 pt-8`

const DocsPage = () => (
  <Layout>
    <LayoutMain>
      <ContentWrapper>
        <Styled.h1>Welcome to the docs</Styled.h1>
        <Styled.p>
          This whole section of the page is automatically generated.
          <br /> It is still under heavy development but will be seamlessly
          upgraded later on.
        </Styled.p>
        <Styled.p>
          Currently, you can dig into the capability of this site via:
        </Styled.p>
        <Styled.ul>
          <Styled.li>
            <Link to="/docs/kitchen-sink">Kitchen Sink (All components)</Link>
          </Styled.li>
          <Styled.li>
            <Link to="/docs/theme">Theme documentation</Link>
          </Styled.li>
        </Styled.ul>
      </ContentWrapper>
    </LayoutMain>
  </Layout>
)

export default DocsPage
