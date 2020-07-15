import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Link from 'gatsby-link'
import styled from '@emotion/styled'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import {
  generatePageMap,
  getPageWithFallback,
} from '@gatsby-mdx-suite/helpers/routing'
import Icon from '@gatsby-mdx-suite/mdx-copy/icon'

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
  display: inline-flex;
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

const SwitcherIcon = styled(Icon)`
  border-radius: 100%;
  overflow: hidden;
  padding-bottom: 3px; /* visual center */
`

function LanguageSwitch({ useIcons }) {
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
              {useIcons ? <SwitcherIcon icon={`flag-${locale}`} /> : locale}
            </SwitcherLink>
          )}
        </ListItem>
      ))}
    </List>
  )
}

LanguageSwitch.defaultProps = {
  useIcons: false,
}

LanguageSwitch.propTypes = {
  useIcons: propTypes.bool,
}

export default LanguageSwitch
