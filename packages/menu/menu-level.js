import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Link from '@gatsby-mdx-suite/mdx-link/link'
import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

import MenuUl from './menu-ul'
import MenuLi from './menu-li'
import MenuTitle from './menu-title'
import { findActiveTrail } from './helpers'

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
    ({ locale, pageId }) =>
      pageId === rootMenuItemId && (!activeLocale || locale === activeLocale)
  )

  if (!menuRoot) {
    throw new Error(`Unable to locale root menu item ${rootMenuItemId}`)
  }

  const activeTrail = findActiveTrail({
    activePageId,
    subTree: [menuRoot],
  })

  const pathToTravel = activeTrail.slice(0, level)

  let currentRoot = menuRoot
  let currentLevel = 1

  pathToTravel.forEach((destination) => {
    currentLevel++

    const result = currentRoot.subitems.find(
      (item) => item.pageId === destination
    )

    if (result) {
      currentRoot = result
    }
  })

  if (currentLevel < level || !currentRoot.subitems) {
    return null
  }

  return (
    <MenuUl>
      {currentRoot.subitems.map((child) => {
        const { title, linkedPage } = child
        const isActive = activeTrail.includes(child.pageId)

        return (
          <MenuLi
            key={title}
            isActive={isActive}
            className={isActive ? 'active' : null}
          >
            <MenuTitle>
              {!linkedPage ? (
                title
              ) : (
                <Link id={linkedPage.pageId} title={title} />
              )}
            </MenuTitle>
          </MenuLi>
        )
      })}
    </MenuUl>
  )
}

MenuLevel.propTypes = {
  rootMenuItemId: propTypes.string.isRequired,
  level: propTypes.number,
}
