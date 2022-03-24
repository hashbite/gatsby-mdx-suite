import { graphql } from 'gatsby'

export const MdxSuiteMenuItemFragment = graphql`
  fragment MdxSuiteMenuItem on ContentfulMenuItem {
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
