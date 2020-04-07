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
  return (
    <MenuUl className={`depth-${depth}`}>
      {children.map((child) => {
        const {
          menuItemId,
          subitems,
          linkedPage,
          internalSlug,
          externalUri,
          ...otherProps
        } = child
        const isActive = activeTrail.includes(menuItemId)

        let content = child.title

        if (linkedPage && linkedPage.pageId) {
          content = (
            <MenuLink
              active={isActive}
              id={linkedPage.pageId}
              {...otherProps}
            />
          )
        }

        if (internalSlug) {
          content = (
            <MenuLink active={isActive} to={internalSlug} {...otherProps} />
          )
        }

        if (externalUri) {
          content = (
            <MenuLink active={isActive} href={externalUri} {...otherProps} />
          )
        }

        return (
          <MenuLi key={menuItemId} active={isActive}>
            <MenuTitle active={isActive}>{content}</MenuTitle>
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
