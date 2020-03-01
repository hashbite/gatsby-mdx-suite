import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { useTranslation } from 'react-i18next'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import tw from 'twin.macro'

import Image from '@gatsby-mdx-suite/mdx-image/image'
import CTA from '@gatsby-mdx-suite/mdx-link/cta'
import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

const BlogPostListingWrapper = styled.div(
  ({ theme }) => css`
    ${tw`grid grid-cols-4 gap-grid-gap`}

    > * {
      ${tw`col-span-4 sm:col-span-2`}

      &:first-child {
        ${tw`sm:col-span-4`}
      }
    }
  `
)

const BlogPostTeaser = tw.article`relative pt-8 px-8 pb-24 bg-gray-300`

const BlogPostTeaserHeadline = tw.h1`mt-8 mb-0`
const BlogPostTeaserMeta = tw.div`text-sm text-gray-800 mb-6`
const BlogPostTeaserDescription = tw.div``
const BlogPostTeaserFooter = tw.div`absolute inset-x-0 bottom-0 px-8 pb-8 flex justify-between text-sm`

/**
 * A list of all blog posts of this site.
 *
 * @example <BlogPostListing />
 */
export default function BlogPostListing() {
  const {
    pageContext: { locale: activeLocale },
  } = useContext(MdxSuiteContext)
  const { t } = useTranslation()

  const result = useStaticQuery(graphql`
    query NewsQuery {
      allContentfulBlogPost(sort: { order: ASC, fields: publishingDate }) {
        nodes {
          pageId: contentful_id
          locale: node_locale
          title
          publishingDate
          image {
            ...MdxSuiteContentfulAsset
            svg {
              content
            }
            sqip(width: 960, height: 412, numberOfPrimitives: 16, blur: 12) {
              dataURI
            }
            fluid(maxWidth: 960, maxHeight: 360) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
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
  `)

  const blogPosts = result.allContentfulBlogPost.nodes
    .filter(({ locale }) => locale === activeLocale)
    .map((blogPost, i) => (
      <BlogPostTeaser key={i}>
        {blogPost.image && <Image {...blogPost.image} />}
        <BlogPostTeaserHeadline>{blogPost.title}</BlogPostTeaserHeadline>
        <BlogPostTeaserMeta>
          {Intl.DateTimeFormat(activeLocale).format(
            new Date(blogPost.publishingDate)
          )}{' '}
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
          <CTA href="#todo">{t('newsReadMore')}</CTA>
        </BlogPostTeaserFooter>
      </BlogPostTeaser>
    ))

  return <BlogPostListingWrapper>{blogPosts}</BlogPostListingWrapper>
}
