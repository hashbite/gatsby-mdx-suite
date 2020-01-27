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

  return <RecursiveMenu children={menuRoot.subitems} activeTrail={activeTrail} />
}

MenuRecursive.propTypes = {
  rootMenuItemId: propTypes.string.isRequired,
}

function RecursiveMenu({ children, activeTrail, depth = 0 }) {
  return (
    <MenuUl className={`depth-${depth}`}>
      {children.map((child) => {
        const { title, subitems, linkedPage, hiddenOnMobile } = child

        return (
          <MenuLi
            key={title}
            hiddenOnMobile={hiddenOnMobile}
            className={activeTrail.includes(child.pageId) ? 'active' : null}
          >
            <MenuTitle>
              {!linkedPage ? (
                title
              ) : (
                <Link id={linkedPage.pageId} title={title} />
              )}
            </MenuTitle>
            {subitems && (
              <RecursiveMenu
                children={subitems}
                depth={depth + 1}
                activeTrail={activeTrail}
              />
            )}
          </MenuLi>
        )
      })}
    </MenuUl>
  )
}

RecursiveMenu.propTypes = {
  children: propTypes.array.isRequired,
  depth: propTypes.number,
  activeTrail: propTypes.array,
}
