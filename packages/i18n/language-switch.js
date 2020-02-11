import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Link from 'gatsby-link'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import { generatePageMap, getPageWithFallback } from './helpers'

const List = styled.ul`
  ${tw`flex m-0 p-0 list-none uppercase whitespace-no-wrap`}
`

const ListItem = styled.li`
  ${tw`m-0`}
`

const SwitcherLink = styled(Link)`
  ${tw`block m-0 px-4 text-center`}

  // https://web.dev/tap-targets/
  min-width: 48px;
  line-height: 48px;
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
