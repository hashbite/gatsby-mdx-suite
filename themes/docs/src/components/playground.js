import React from 'react'

import Layout from './layout/layout'
import LayoutMain from './layout/main'
import LiveEditor from './live-editor'
import DataProvider from './data-provider'

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
      <Layout title="Playground">
        <LayoutMain>
          <LiveEditor initialValue={defaultMDX} layout="vertical" />
        </LayoutMain>
      </Layout>
    </DataProvider>
  )
}

Playground.displayName = 'Playground'

export default Playground
