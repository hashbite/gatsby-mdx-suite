import { graphql } from 'gatsby'

export const MdxSuiteSitePageMetadataFragment = graphql`
  fragment MdxSuiteSitePageMetadata on SitePage {
    path
    context {
      pageId
      locale
      title
      pageNumber
    }
  }
`
