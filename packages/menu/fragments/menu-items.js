import { graphql } from 'gatsby'

export const MenuItemFragment = graphql`
  fragment MenuItem on ContentfulMenuItem {
    menuItemId: contentful_id
    title
    locale: node_locale
    linkedPage {
      pageId: contentful_id
    }
    internalSlug
    externalUri
    openInNewTab
  }
`
