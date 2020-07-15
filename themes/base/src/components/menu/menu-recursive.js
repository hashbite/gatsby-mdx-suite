import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { cx } from 'emotion'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import { findActiveTrail } from '@gatsby-mdx-suite/helpers/menu'

import MenuUl from './menu-ul'
import MenuItem from './menu-item'

export default function MenuRecursive({ rootMenuItemId }) {
  const queryResult = useStaticQuery(graphql`
    query MenuRecursiveQuery {
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

  return (
    <RecursiveMenu children={menuRoot.subitems} activeTrail={activeTrail} />
  )
}

MenuRecursive.propTypes = {
  rootMenuItemId: propTypes.string.isRequired,
}

function RecursiveMenu({ children, activeTrail, depth = 0 }) {
  const depthClass = cx(`depth-${depth}`)

  return (
    <MenuUl className={depthClass}>
      {children.map(({ ...itemData }) => (
        <MenuItem
          key={itemData.menuItemId}
          activeTrail={activeTrail}
          className={depthClass}
          {...itemData}
        >
          {itemData.subitems && (
            <RecursiveMenu
              children={itemData.subitems}
              depth={depth + 1}
              activeTrail={activeTrail}
            />
          )}
        </MenuItem>
      ))}
    </MenuUl>
  )
}

RecursiveMenu.propTypes = {
  children: propTypes.array.isRequired,
  depth: propTypes.number,
  activeTrail: propTypes.array,
}
