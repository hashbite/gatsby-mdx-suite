import { graphql } from 'gatsby'

export const MenuItemFragment = graphql`
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
