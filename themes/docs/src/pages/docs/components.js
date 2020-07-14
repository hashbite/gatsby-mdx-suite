import React from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'

import Layout from '../../components/layout/layout'
import LayoutMain from '../../components/layout/main'
import LayoutNav from '../../components/layout/nav'
import ComponentsMenu from '../../components/layout/components-menu'

const Wrapper = styled.div`
  ${tw`text-2xl font-bold text-center`}

  height: 90vh;
  line-height: 90vh;
`

const DocsComponentsPage = () => (
  <Layout title="Components">
    <LayoutNav title="Components">
      <ComponentsMenu />
    </LayoutNav>
    <LayoutMain>
      <Wrapper>Please pick a component from the menu</Wrapper>
    </LayoutMain>
  </Layout>
)

export default DocsComponentsPage
