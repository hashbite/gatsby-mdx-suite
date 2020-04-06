import React from 'react'
import propTypes from 'prop-types'
import tw from 'twin.macro'

import ListItem from './list-item'

const StyledList = tw.ul`mt-4 mb-8 p-0`

/**
 * @example
 * <List>
 *
 * Every paragraph
 * will become a new item
 *
 * Just make sure to have a empty line inbetween.
 *
 * <div>
 *
 * # Grouping
 *
 * Works with the `<div/>` element.
 *
 * </div>
 *
 * </List>
 * <List>
 * <ListItem icon="check">Example for icon **check**</ListItem>
 * <ListItem icon="circle">Example for icon **circle**</ListItem>
 * <ListItem icon="dot">Example for icon **dot**</ListItem>
 * <ListItem icon="dotSmall">Example for icon **dotSmall**</ListItem>
 * <ListItem icon="star">Example for icon **star**</ListItem>
 * <ListItem icon="starOutlined">Example for icon **starOutlined**</ListItem>
 * </List>
 */
export default function List({ children }) {
  if (!children) {
    return null
  }

  if (!Array.isArray(children)) {
    children = [children]
  }

  children = children.map((child, i) =>
    child.props.mdxType === 'li' || child.props.mdxType === 'ListItem' ? (
      <ListItem key={i} icon={child.props.icon}>
        {child.props.children}
      </ListItem>
    ) : (
      <ListItem key={i}>{child}</ListItem>
    )
  )

  return <StyledList>{children}</StyledList>
}

List.propTypes = {
  children: propTypes.node.isRequired,
}
