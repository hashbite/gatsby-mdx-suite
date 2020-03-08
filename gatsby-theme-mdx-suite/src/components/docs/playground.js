import React from 'react'
import styled from '@emotion/styled'

import Layout from './layout/layout'
import LayoutMain from './layout/main'
import LiveEditor from './live-editor'
import DataProvider from './data-provider'

const PlaygroundWrapper = styled.div`
  height: calc(100vh - 60px);
  overflow-y: scroll;
`

const defaultMDX = `<Header>

# Playground

</Header>
<Section>

## Welcome

* This
* Is
* A
* List

<Image id="randomImageId" />

</Section>
`

function Playground() {
  return (
    <DataProvider>
      <Layout title="Theme">
        <LayoutMain>
          <PlaygroundWrapper>
            <LiveEditor initialValue={defaultMDX} layout="vertical" />
          </PlaygroundWrapper>
        </LayoutMain>
      </Layout>
    </DataProvider>
  )
}

Playground.displayName = 'Playground'

export default Playground
