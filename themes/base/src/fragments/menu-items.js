import { graphql } from 'gatsby'

export const MdxSuiteMenuItemFragment = graphql`
  fragment MdxSuiteMenuItem on ContentfulMenuItem {
    menuItemId: contentful_id
    title
    locale: node_locale
    internalTargetId
    internalSlug
    externalUri
    openInNewTab
    hiddenOnMobile
  }
`
