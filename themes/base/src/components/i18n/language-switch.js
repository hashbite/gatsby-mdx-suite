import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import tw from 'twin.macro'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import {
  generatePageMap,
  getPageWithFallback,
} from '@gatsby-mdx-suite/helpers/routing'
import Icon from 'gatsby-theme-mdx-suite-base/src/components/icon'

const List = tw.ul`
  flex m-0 mb-0! p-0 list-none uppercase whitespace-no-wrap
`

const ListItem = styled.li({
  margin: 0,
})

const SwitcherLink = styled(Link)`
  display: flex;
  min-width: 48px;
  padding: 0 1em;
  text-align: center;
  transition: 0.3s opacity linear;
  font-size: 1.4em;
  vertical-align: middle;

  &:hover {
    opacity: 0.8;
    text-decoration: none;
  }
`

const SwitcherIcon = styled(Icon)``

function LanguageSwitch({ useIcons }) {
  const {
    pageContext: { pageId, locale: activeLocale },
    themeConfig: { langs, defaultLocale },
  } = useContext(MdxSuiteContext)

  const result = useStaticQuery(graphql`
    query LanguageSwitchQuery {
      allSitePage {
        nodes {
          ...MdxSuiteSitePageMetadata
        }
      }
    }
  `)

  // No need for a language switch when only one language is enabled
  if (langs.length === 1) {
    return null
  }

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
              {useIcons ? <SwitcherIcon icon={`flag-${locale}`} /> : locale}
            </SwitcherLink>
          )}
        </ListItem>
      ))}
    </List>
  )
}

LanguageSwitch.defaultProps = {
  useIcons: true,
}

LanguageSwitch.propTypes = {
  useIcons: propTypes.bool,
}

export default LanguageSwitch
