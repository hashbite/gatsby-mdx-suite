import React from 'react'
import tw from 'twin.macro'
import styled from '@emotion/styled'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Cta from '@gatsby-mdx-suite/mdx-link/cta'
import Image from 'gatsby-theme-mdx-suite-core/src/components/image'
import { t } from '@lingui/macro'

const BlogPostTeaserWrapper = tw.article`flex flex-col h-full`
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

const BlogPostTeaser = ({ blogPost, ...props }) => {
  return (
    <BlogPostTeaserWrapper {...props}>
      <BlogPostTeaserImage imageData={blogPost.image} />
      <BlogPostTeaserHeadline>{blogPost.title}</BlogPostTeaserHeadline>
      <BlogPostTeaserMeta>
        {Intl.DateTimeFormat(blogPost.locale).format(
          new Date(blogPost.publicationDate)
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
        <Cta id={blogPost.pageId}>{t('newsReadMore')}</Cta>
      </BlogPostTeaserFooter>
    </BlogPostTeaserWrapper>
  )
}

export default BlogPostTeaser
