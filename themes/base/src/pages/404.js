import React from 'react'
import { useTranslation } from 'react-i18next'
import { Styled } from 'theme-ui'

import Layout from 'gatsby-theme-mdx-suite-base/src/components/layout/layout'
import Header from 'gatsby-theme-mdx-suite-base/src/components/layout/header'
import Seo from 'gatsby-theme-mdx-suite-base/src/components/layout/seo'

function NotFoundPage() {
  const { t } = useTranslation()

  const title = t(`404PageTitle`)
  const description = t(`404PageDescription`)

  return (
    <Layout>
      <Seo title={title} />
      <Header />
      <Styled.h1>{title}</Styled.h1>
      <Styled.p>{description}</Styled.p>
    </Layout>
  )
}

export default NotFoundPage
