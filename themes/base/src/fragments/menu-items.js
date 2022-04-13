import { graphql } from 'gatsby'

export const MdxSuiteMenuItemFragment = graphql`
  fragment MdxSuiteMenuItem on ContentfulContentTypeMenuItem {
    sys {
      id
      locale
    }
    title
    internalTargetId
    internalSlug
    externalUri
    openInNewTab
    hiddenOnMobile
  }
`
