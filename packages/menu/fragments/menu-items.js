import { graphql } from 'gatsby'

export const MenuItemFragment = graphql`
  fragment MenuItem on ContentfulMenuItem {
    pageId: contentful_id
    title
    locale: node_locale
    linkedPage {
      pageId: contentful_id
    }
  }
`
