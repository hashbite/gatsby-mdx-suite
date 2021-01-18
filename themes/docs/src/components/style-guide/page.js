import React from 'react'

import Layout from '../layout/layout'
import LayoutMain from '../layout/main'

import StyleGuideConfig from './config'
import StyleGuideElements from './elements'

function StyleGuide() {
  return (
    <Layout title="Style Guide">
      <LayoutMain>
        <StyleGuideElements />
        <StyleGuideConfig />
      </LayoutMain>
    </Layout>
  )
}

export default StyleGuide
