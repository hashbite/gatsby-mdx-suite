import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Link from '@gatsby-mdx-suite/mdx-basic/link'
import LocationContext from '@gatsby-mdx-suite/contexts/location'
import I18nContext from '@gatsby-mdx-suite/contexts/i18n'

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

  const { activePageId: id } = useContext(LocationContext)
  const { active: activeLocale } = useContext(I18nContext)

  const menuRoot = queryResult.allContentfulMenuItem.nodes.find(
    ({ locale, pageId }) => pageId === rootMenuItemId && locale === activeLocale
  )

  if (!menuRoot) {
    throw new Error(`Unable to locale root menu item ${rootMenuItemId}`)
  }

  const activeTrail = findActiveTrail({
    id,
    subTree: [menuRoot],
  })

  const pathToTravel = activeTrail.slice(0, level)

  let currentRoot = menuRoot
  let currentLevel = 1

  pathToTravel.forEach((destination) => {
    currentLevel++

    const result = currentRoot.subitems.find(
      (item) => item.contentful_id === destination
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
        const { title } = child
        const linkedPage = child.linkedPage || child.linkedApp
        const isActive = activeTrail.includes(child.contentful_id)

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
