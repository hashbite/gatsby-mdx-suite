import React from 'react'

import Layout from '../layout/layout'
import LayoutMain from '../layout/main'

import StyleGuideConfig from './config'

function StyleGuide() {
  return (
    <Layout title="Style Guide">
      <LayoutMain>
        <StyleGuideConfig />
      </LayoutMain>
    </Layout>
  )
}

export default StyleGuide
