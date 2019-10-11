import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { defaultLocale, langs } from '../data/languages'
import { GlobalContext, LocationContext } from '../utils/Contexts'

const List = styled.ul({
  display: 'flex',
  margin: 0,
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
  &[aria-current='page'] {
    display: none;
  }
`

export default function LanguageSelect() {
  const { pages, activeLocale } = useContext(GlobalContext)
  const { activeContentfulId } = useContext(LocationContext)
  const page = pages[activeContentfulId]

  // Array representing the language switcher menu
  const langsMenu = langs.map((locale) => {
    let path

    // Generate path to translated version
    if (page[locale]) {
      path = page[locale].path
    }

    // Fallback to default locale if translation is not available
    if (!path && page[defaultLocale]) {
      path = page[defaultLocale].path
    }

    // Fallback if no version with default locale is available
    if (!path && page.length) {
      path = page[Object.keys(page)[0]].path
    }

    // Unable to create any path. This should not happen.
    if (!path) {
      throw new Error(
        `Unable to generate language selector link for ${activeContentfulId} with locale ${locale}`
      )
    }

    return {
      locale,
      path,
    }
  })

  return (
    <List>
      {langsMenu.map(({ path, locale }) => (
        <ListItem key={locale}>
          <SwitcherLink to={path} hidden={locale === activeLocale}>
            {locale}
          </SwitcherLink>
        </ListItem>
      ))}
    </List>
  )
}
