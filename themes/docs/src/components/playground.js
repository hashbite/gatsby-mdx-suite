import React from 'react'

import Layout from './layout/layout'
import LayoutMain from './layout/main'
import LiveEditor from './live-editor/live-editor'
import DataProvider from './data-provider'

const defaultMDX = `<Section backgroundImageId="randomPictureId" minHeight="42vh">

<NavBar transparent />

# Headline

</Section>
<Section>

## Welcome to this page

Some paragraph without special formatting.

* This
* Is
* A
* List

### Example Image:

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
