import React from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'

import Layout from './layout/layout'
import LayoutMain from './layout/main'
import LayoutNav from './layout/nav'

import DataProvider from './data-provider'
import ComponentsMenu from './layout/components-menu'

const Wrapper = styled.div`
  ${tw`text-2xl font-bold text-center`}

  height: 90vh;
  line-height: 90vh;
`

function KitchenSink() {
  return (
    <DataProvider>
      <Layout title="Kitchen Sink (Component Overview)">
        <LayoutNav title="Menu">
          <ComponentsMenu />
        </LayoutNav>
        <LayoutMain>
          <Wrapper>Please pick a component from the menu</Wrapper>
        </LayoutMain>
      </Layout>
    </DataProvider>
  )
}

KitchenSink.displayName = 'KitchenSink'

export default KitchenSink
