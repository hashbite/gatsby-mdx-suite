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
import Image from '@gatsby-mdx-suite/mdx-image/image'
import Icon from '@gatsby-mdx-suite/mdx-copy/icon'

const BlogPostTeaser = tw.article`flex flex-col h-full`
const BlogPostTeaserHeadline = styled.h1`
  ${tw`my-0 text-xl leading-relaxed`}
  min-height: 6rem;
  display: flex;
  align-items: center;
`
const BlogPostTeaserMeta = styled.div`
  ${tw`text-sm text-gray-600 mb-8 mt-2 text-secondary py-2`}
`
const BlogPostTeaserDescription = tw.div`flex-1`
const BlogPostTeaserFooter = tw.div`mt-8`
const BlogPostTeaserImage = tw(Image)``
const Pagination = tw.div`flex justify-between`

const BlogPostList = ({ data, pageContext }) => {
  const MdxSuiteData = useContext(MdxSuiteContext)
  const { t } = useTranslation()

  const { locale } = pageContext

  const blogPosts = data.allContentfulBlogPost.nodes.map((blogPost, i) => (
    <BlogPostTeaser key={i}>
      <BlogPostTeaserImage {...blogPost.image} />
      <BlogPostTeaserHeadline>{blogPost.title}</BlogPostTeaserHeadline>
      <BlogPostTeaserMeta>
        {Intl.DateTimeFormat(locale).format(new Date(blogPost.publicationDate))}{' '}
        -{' '}
        {t('newsTimeToRead', {
          minutes: blogPost.content.childMdx.timeToRead,
        })}
      </BlogPostTeaserMeta>

      {blogPost.teaser && (
        <BlogPostTeaserDescription>
          <MDXRenderer>{blogPost.teaser.childMdx.body}</MDXRenderer>
        </BlogPostTeaserDescription>
      )}
      <BlogPostTeaserFooter>
        <Cta id={blogPost.pageId}>{t('newsReadMore')}</Cta>
      </BlogPostTeaserFooter>
    </BlogPostTeaser>
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
