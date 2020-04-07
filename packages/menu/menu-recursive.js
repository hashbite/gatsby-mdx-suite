import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

import MenuLink from './menu-link'
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
  const {
    pageContext: { pageId: activePageId },
  } = useContext(MdxSuiteContext)

  return (
    <MenuUl className={`depth-${depth}`}>
      {children.map((child) => {
        const {
          title,
          menuItemId,
          linkedPage,
          internalSlug,
          externalUri,
          subitems,
        } = child

        // Menu item links to current page or is part of the active trail
        const isActive =
          activeTrail.includes(menuItemId) ||
          (linkedPage && linkedPage.pageId === activePageId)

        const className = isActive ? 'active' : null

        let content = title

        if (linkedPage && linkedPage.pageId) {
          content = (
            <MenuLink
              className={className}
              activeClassName={null}
              id={linkedPage.pageId}
              title={title}
            />
          )
        }

        if (internalSlug) {
          content = (
            <MenuLink
              className={className}
              activeClassName={null}
              to={internalSlug}
              title={title}
            />
          )
        }

        if (externalUri) {
          content = (
            <MenuLink
              className={className}
              activeClassName={null}
              href={externalUri}
              title={title}
            />
          )
        }

        return (
          <MenuLi key={menuItemId} className={className}>
            <MenuTitle className={className}>{content}</MenuTitle>
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
