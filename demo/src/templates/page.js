import React from 'react'
import { graphql } from 'gatsby'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import useDeepCompareEffect from 'use-deep-compare-effect'

import { useMDXDataDispatch } from '@gatsby-mdx-suite/contexts/mdx-data'
import Layout from '../components/layout'
import MdxDataContextProvider from '../mdx-data-context-provider'

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
      <Helmet
        /**
         * Meta information based on:
         * https://moz.com/blog/meta-data-templates-123
         * https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
         */
        title={title}
        meta={[
          {
            name: 'viewport',
            content:
              'width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0',
          },
          {
            property: 'og:title',
            content: title,
          },
          {
            name: 'description',
            content: seoDescription,
          },
          {
            property: 'og:description',
            content: seoDescription,
          },
          seoImage && {
            property: 'twitter:image:src',
            content: `${seoImage.file.url}?w=1200&h=628&fit=fill`,
          },
          seoImage && {
            property: 'og:image',
            content: `${seoImage.file.url}?w=1200&h=630&fit=fill`,
          },
        ].filter(Boolean)}
      />
      <MdxDataContextProvider>
        <MDXProvider>
          <MDXRenderer>{content.childMdx.body}</MDXRenderer>
        </MDXProvider>
      </MdxDataContextProvider>
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
