import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { useTranslation } from 'react-i18next'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Image from '@gatsby-mdx-suite/mdx-basic/image'
import Link from '@gatsby-mdx-suite/mdx-basic/link'
import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

const BlogPostListingWrapper = styled.div(
  ({
    theme: {
      sizes: { gridGutter },
      breakpoints,
    },
  }) => css`
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

const BlogPostTeaser = styled.article(
  ({ theme: { colors, spacing } }) => css`
    position: relative;
    padding: ${spacing.s2}px ${spacing.s2}px ${spacing.s4}px;
    background: ${colors.lightGrey};
  `
)

const BlogPostTeaserHeadline = styled.h1(
  ({ theme: { spacing } }) => css`
    font-size: 1.2em;
    margin: ${spacing.s2}px 0;
  `
)
const BlogPostTeaserDescription = styled.div``
const BlogPostTeaserFooter = styled.div(
  ({ theme: { spacing } }) => css`
    position: absolute;
    bottom: ${spacing.s2}px;
    left: ${spacing.s2}px;
    right: ${spacing.s2}px;
    display: flex;
    font-size: 12px;
    justify-content: space-between;
  `
)
const BlogPostTeaserMeta = styled.span`
  font-size: 0.9em;
  opacity: 0.8;
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
