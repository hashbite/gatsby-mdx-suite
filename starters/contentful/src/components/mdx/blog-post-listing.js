import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { useTranslation } from 'react-i18next'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import tw from 'tailwind.macro'

import Image from '@gatsby-mdx-suite/mdx-image/image'
import Link from '@gatsby-mdx-suite/mdx-link/link'
import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

const BlogPostListingWrapper = styled.div(
  ({
    theme: {
      sizes: { gridGutter },
      breakpoints,
    },
  }) => css`
    // display grid not yet supported by tailwind.macro
    display: grid;
    grid-gap: ${gridGutter}px;

    grid-template-columns: repeat(4, 1fr);

    > * {
      grid-column-end: span 4;

      @media (min-width: ${breakpoints[2]}) {
        grid-column-end: span 2;

        &:first-child {
          grid-column-end: span 4;
        }
      }
    }
  `
)

const BlogPostTeaser = styled.article`
  ${tw`relative p-8 pb-16 bg-gray-200`}
`

const BlogPostTeaserHeadline = styled.h1`
  ${tw`mt-8 mb-0 text-xl`}
`

const BlogPostTeaserDescription = styled.div``
const BlogPostTeaserFooter = styled.div(
  ({ theme: { spacing } }) => css`
    ${tw`absolute flex justify-between text-sm`}
    // @todo merge tailwind & theme-ui theme
    bottom: ${spacing.s2}px;
    left: ${spacing.s2}px;
    right: ${spacing.s2}px;
  `
)
const BlogPostTeaserMeta = styled.div`
  ${tw`text-sm text-gray-700 mb-6`}
`

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
          <Link id={blogPost.pageId}>{t('newsReadMore')}</Link>
        </BlogPostTeaserFooter>
      </BlogPostTeaser>
    ))

  return <BlogPostListingWrapper>{blogPosts}</BlogPostListingWrapper>
}
