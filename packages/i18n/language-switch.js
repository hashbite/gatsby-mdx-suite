import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Link from 'gatsby-link'
import styled from '@emotion/styled'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import { generatePageMap, getPageWithFallback } from './helpers'

const List = styled.ul({
  display: 'flex',
  margin: 0,
  padding: 0,
  listStyleType: 'none',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
})

const ListItem = styled.li({
  margin: 0,
})

const SwitcherLink = styled(Link)`
  display: block;
  min-width: 48px;
  padding: 0 0.6em;
  line-height: 48px;
  text-align: center;
  transition: 0.3s opacity linear;

  &:hover {
    opacity: 0.8;
    text-decoration: none;
  }
`

export default function LanguageSwitch() {
  const {
    pageContext: { pageId, locale: activeLocale },
    themeConfig: { langs, defaultLocale },
  } = useContext(MdxSuiteContext)

  const result = useStaticQuery(graphql`
    {
      allSitePage {
        nodes {
          path
          context {
            pageId
            locale
            title
          }
        }
      }
    }
  `)

  // Generate a language based map of sub pages relating to the current content
  const pageMap = generatePageMap({
    pages: result.allSitePage.nodes,
    activePageId: pageId,
  })

  // Array representing the language switcher menu
  const langsMenu = langs
    .map((locale) => {
      const page = getPageWithFallback({ pageMap, locale, defaultLocale })
      if (!page) {
        return null
      }
      return {
        locale,
        page,
      }
    })
    .filter(Boolean)

  if (!langsMenu.length) {
    return null
  }

  return (
    <List>
      {langsMenu.map(({ page, locale }) => (
        <ListItem key={locale} hidden={locale === activeLocale}>
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
