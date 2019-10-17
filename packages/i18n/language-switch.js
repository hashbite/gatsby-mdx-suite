import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import LocationContext from '@gatsby-mdx-suite/contexts/location'
import I18nContext from '@gatsby-mdx-suite/contexts/i18n'
import {
  generatePageMap,
  getPageWithFallback,
} from '@gatsby-mdx-suite/i18n/helpers'

const List = styled.ul({
  display: 'flex',
  margin: 0,
  padding: 0,
  listStyleType: 'none',
  textTransform: 'uppercase',
})

const ListItem = styled.li({
  margin: '0.25rem',
})

const SwitcherLink = styled(Link)`
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
  const { pages, activePageId } = useContext(LocationContext)

  const pageMap = generatePageMap({ pages, pageId: activePageId })

  // Array representing the language switcher menu
  const langsMenu = langs.map((locale) => {
    const page = getPageWithFallback({ pageMap, locale, defaultLocale })
    return {
      locale,
      page,
    }
  })

  return (
    <List>
      {langsMenu.map(({ page, locale }) => (
        <ListItem key={locale}>
          <SwitcherLink to={page.path} hidden={page.locale === activeLocale}>
            {locale}
          </SwitcherLink>
        </ListItem>
      ))}
    </List>
  )
}
