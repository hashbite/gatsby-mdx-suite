import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Link from 'gatsby-link'
import styled from '@emotion/styled'

import I18nContext from '@gatsby-mdx-suite/contexts/i18n'
import LocationContext from '@gatsby-mdx-suite/contexts/location'
import { generatePageMap, getPageWithFallback } from './helpers'

const List = styled.ul({
  display: 'flex',
  margin: 0,
  padding: 0,
  listStyleType: 'none',
  textTransform: 'uppercase',
})

const ListItem = styled.li({
  margin: 0,
})

const SwitcherLink = styled(Link)`
  padding: 0.25rem;
  transition: 0.3s opacity linear;

  &:hover {
    opacity: 0.8;
    text-decoration: none;
  }
`

export default function LanguageSwitch() {
  const { langs, default: defaultLocale, active: activeLocale } = useContext(
    I18nContext
  )
  const { activePageId } = useContext(LocationContext)

  const result = useStaticQuery(graphql`
    {
      allSitePage {
        nodes {
          path
          context {
            pageId
            locale
            menuTitle
            title
          }
        }
      }
    }
  `)

  // Generate a language based map of sub pages relating to the current content
  const pageMap = generatePageMap({
    pages: result.allSitePage.nodes,
    activePageId,
  })

  // Array representing the language switcher menu
  const langsMenu = langs.map((locale) => {
    const page = getPageWithFallback({ pageMap, locale, defaultLocale })
    if (!page) {
      return null
    }
    return {
      locale,
      page,
    }
  }).filter(Boolean)

  if (!langsMenu.length) {
    return null
  }

  return (
    <List>
      {langsMenu.map(({ page, locale }) => (
        <ListItem key={locale} hidden={page.locale === activeLocale}>
          {page && page.path && (
            <SwitcherLink
              to={page.path}
              aria-label={`Switch language to ${locale}`}
            >
              {locale}
            </SwitcherLink>
          )}
        </ListItem>
      ))}
    </List>
  )
}
