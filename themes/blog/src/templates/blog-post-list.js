import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { graphql } from 'gatsby'
import tw from 'twin.macro'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import mergeContextData from '@gatsby-mdx-suite/helpers/data/merge-context-data'

import Columns from '@gatsby-mdx-suite/mdx-layout/columns'
import Section from '@gatsby-mdx-suite/mdx-layout/section'
import Cta from '@gatsby-mdx-suite/mdx-link/cta'
import Icon from 'gatsby-theme-mdx-suite-base/src/components/icon'

import BlogPostTeaser from '../components/blog-post-teaser'

const Pagination = styled.div`
  ${tw`flex justify-between`}
`

const BlogPostList = ({ data, pageContext }) => {
  const MdxSuiteData = useContext(MdxSuiteContext)
  const { t } = useTranslation()

  const blogPosts = data.allContentfulBlogPost.nodes.map((blogPost, i) => (
    <BlogPostTeaser key={i} blogPost={blogPost} />
  ))

  const content = data.contentfulPage.content

  return (
    <MdxSuiteContext.Provider
      value={mergeContextData(MdxSuiteData, {
        pageContext,
        data: [content && content.childMdx],
      })}
    >
      <MDXRenderer>{content && content.childMdx.body}</MDXRenderer>
      <Section>
        <Columns maxColumns={2}>{blogPosts}</Columns>
        <Pagination>
          <div>
            {pageContext.previousPagePath && (
              <Cta to={pageContext.previousPagePath}>
                <Icon icon="previous" />
                {t('previous')}
              </Cta>
            )}
          </div>
          <div>
            {pageContext.nextPagePath && (
              <Cta to={pageContext.nextPagePath}>
                {t('next')}
                <Icon icon="next" />
              </Cta>
            )}
          </div>
        </Pagination>
      </Section>
    </MdxSuiteContext.Provider>
  )
}

export default BlogPostList

BlogPostList.propTypes = {
  data: propTypes.object.isRequired,
  pageContext: propTypes.object.isRequired,
}

export const blogPostListQuery = graphql`
  query blogPostListQuery($skip: Int!, $limit: Int!, $locale: String!) {
    contentfulPage(slug: { eq: "blog" }) {
      content {
        childMdx {
          body
          ...MdxSuiteMediaCollections
        }
      }
    }
    allContentfulBlogPost(
      sort: { fields: [publicationDate], order: DESC }
      filter: { node_locale: { eq: $locale } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        pageId: contentful_id
        locale: node_locale
        title
        publicationDate
        image {
          ...MdxSuiteMediaCollectionHalf
        }
        content {
          childMdx {
            timeToRead
          }
        }
        teaser {
          childMdx {
            body
          }
        }
      }
    }
  }
`
