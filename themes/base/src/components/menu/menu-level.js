import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { cx } from 'emotion'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import { findActiveTrail } from '@gatsby-mdx-suite/helpers/menu'

import MenuUl from './menu-ul'
import MenuItem from './menu-item'

export default function MenuLevel({ rootMenuItemId, level = 1 }) {
  const queryResult = useStaticQuery(graphql`
    query MenuLevelQuery {
      allContentfulMenuItem {
        nodes {
          ...MenuItem
          subitems {
            ...MenuItem
            subitems {
              ...MenuItem
              subitems {
                ...MenuItem
                subitems {
                  ...MenuItem
                }
              }
            }
          }
        }
      }
    }
  `)

  const {
    pageContext: { pageId: activePageId, locale: activeLocale },
  } = useContext(MdxSuiteContext)

  const menuRoot = queryResult.allContentfulMenuItem.nodes.find(
    ({ locale, menuItemId }) =>
      menuItemId === rootMenuItemId &&
      (!activeLocale || locale === activeLocale)
  )

  if (!menuRoot) {
    throw new Error(`Unable to locale root menu item ${rootMenuItemId}`)
  }

  const activeTrail = findActiveTrail({
    id: activePageId,
    subTree: [menuRoot],
  })

  const pathToTravel = activeTrail.slice(0, level)

  let currentRoot = menuRoot
  let currentLevel = 1

  pathToTravel.forEach((destination) => {
    currentLevel++

    const result = currentRoot.subitems.find(
      (item) => item.menuItemId === destination
    )

    if (result) {
      currentRoot = result
    }
  })

  if (currentLevel < level || !currentRoot.subitems) {
    return null
  }

  const levelClass = cx(`level-${level}`)

  return (
    <MenuUl className={levelClass}>
      {currentRoot.subitems.map(({ ...itemData }) => (
        <MenuItem
          key={itemData.menuItemId}
          activeTrail={activeTrail}
          className={levelClass}
          {...itemData}
        />
      ))}
    </MenuUl>
  )
}

MenuLevel.propTypes = {
  rootMenuItemId: propTypes.string.isRequired,
  level: propTypes.number,
}
