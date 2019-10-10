import React from 'react'
import { graphql } from 'gatsby'
import * as PropTypes from 'prop-types'

import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import useDeepCompareEffect from 'use-deep-compare-effect'

import { useMDXDataDispatch } from '@gatsby-mdx-suite/contexts/mdx-data'
import Seo from '@gatsby-mdx-suite/seo'

import Layout from '../components/layout'

function PageTemplate({ data }) {
  const mdxDataDispatch = useMDXDataDispatch()
  const {
    title,
    seoDescription,
    seoImage,
    content,
    contentMedia,
  } = data.contentfulPage

  useDeepCompareEffect(() => {
    mdxDataDispatch({
      type: 'add',
      id: 'contentfulAssets',
      data: contentMedia,
    })
  }, [contentMedia])

  return (
    <Layout>
      <Seo
        title={title}
        description={seoDescription}
        ogImage={`${seoImage.file.url}?w=1200&h=630&fit=fill`}
        twitterImage={`${seoImage.file.url}?w=1200&h=628&fit=fill`}
      />
      <MDXProvider>
        <MDXRenderer>{content.childMdx.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PageTemplate

export const pageQuery = graphql`
  query pageQuery($id: String!) {
    contentfulPage(id: { eq: $id }) {
      id
      contentful_id
      slug
      title
      seoDescription
      seoImage {
        file {
          url
        }
      }
      content {
        childMdx {
          body
        }
      }
      contentMedia {
        contentful_id
        file {
          contentType
          details {
            image {
              height
              width
            }
          }
        }
        svgContent
        sqip(mode: 8, numberOfPrimitives: 42, blur: 0) {
          dataURI
        }
        fluid(maxWidth: 1920) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
    }
  }
`
