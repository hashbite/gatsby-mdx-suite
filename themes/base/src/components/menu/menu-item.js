import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { cx, css } from 'emotion'
import tw from 'twin.macro'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

import MenuLink from './menu-link'
import MenuLi from './menu-li'
import MenuTitle from './menu-title'

const MenuItem = ({
  activeTrail,
  className,
  title,
  menuItemId,
  internalTargetId,
  internalSlug,
  externalUri,
  openInNewTab,
  hiddenOnMobile,
  children,
  ...rest
}) => {
  const {
    pageContext: { pageId: activePageId },
  } = useContext(MdxSuiteContext)

  // Menu item links to current page or is part of the active trail
  const isActive =
    activeTrail.includes(menuItemId) || internalTargetId === activePageId

  const activeClass = isActive && 'active'
  const hiddenClass =
    hiddenOnMobile &&
    css`
      ${tw`hidden xl:block`}
    `

  let content = (
    <MenuTitle className={cx(className, activeClass, hiddenClass)}>
      {title}
    </MenuTitle>
  )

  const linkProps = {
    className: cx(className, activeClass),
    title,
    openInNewTab,
  }

  if (internalTargetId) {
    content = <MenuLink {...linkProps} id={internalTargetId} />
  }

  if (internalSlug) {
    content = <MenuLink {...linkProps} to={internalSlug} />
  }

  if (externalUri) {
    content = <MenuLink {...linkProps} href={externalUri} />
  }

  return (
    <MenuLi
      key={menuItemId}
      className={cx(className, activeClass, hiddenClass)}
    >
      {content}
      {children}
    </MenuLi>
  )
}

MenuItem.propTypes = {
  activeTrail: propTypes.array.isRequired,
  className: propTypes.string,
  menuItemId: propTypes.string.isRequired,
  title: propTypes.string,
  internalTargetId: propTypes.string,
  internalSlug: propTypes.string,
  externalUri: propTypes.string,
  children: propTypes.node,
  openInNewTab: propTypes.bool,
  hiddenOnMobile: propTypes.bool,
}

export default MenuItem
