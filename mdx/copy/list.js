import React from 'react'
import propTypes from 'prop-types'
import tw from 'twin.macro'

import ListItem from './list-item'

const StyledList = tw.ul``

/**
 * @example
 * <List>
 * <ListItem>Foo</ListItem>
 * <ListItem>Bar</ListItem>
 * <ListItem>Baz</ListItem>
 * </List>
 * @example
 * <List defaultIcon="dotSmall">
 * <ListItem>Foo</ListItem>
 * <ListItem>Bar</ListItem>
 * <ListItem>Baz</ListItem>
 * </List>
 * @example
 * <List defaultIcon="star" defaultIconColor="red">
 * <ListItem>Foo</ListItem>
 * <ListItem icon="circle">Bar</ListItem>
 * <ListItem icon="check" iconColor="green">Baz</ListItem>
 * </List>
 * @example
 * <List>
 * <ListItem icon="check">
 *
 * Example for icon **check** with Markdown formatting applied
 *
 * </ListItem>
 * <ListItem icon="circle">
 *
 * Example for icon **circle** with Markdown formatting applied
 *
 * </ListItem>
 * <ListItem icon="dot">
 *
 * Example for icon **dot** with Markdown formatting applied
 *
 * </ListItem>
 * <ListItem icon="dotSmall">
 *
 * Example for icon **dotSmall** with Markdown formatting applied
 *
 * </ListItem>
 * <ListItem icon="star">
 *
 * Example for icon **star** with Markdown formatting applied
 *
 * </ListItem>
 * <ListItem icon="starOutlined">
 *
 * Example for icon **starOutlined** with Markdown formatting applied
 *
 * </ListItem>
 * </List>
 */
export default function List({
  type,
  defaultIcon,
  defaultIconColor,
  children,
}) {
  if (!children) {
    return null
  }

  if (!Array.isArray(children)) {
    children = [children]
  }

  children = children.map((child, i) =>
    child.props &&
    (child.props.mdxType === 'li' || child.props.mdxType === 'ListItem') ? (
      <ListItem
        key={i}
        icon={child.props.icon || defaultIcon}
        iconColor={child.props.iconColor || defaultIconColor}
        type={type}
      >
        {child.props.children}
      </ListItem>
    ) : (
      <ListItem
        key={i}
        icon={defaultIcon}
        iconColor={defaultIconColor}
        type={type}
      >
        {child}
      </ListItem>
    )
  )

  return <StyledList as={type === 'ordered' && 'ol'}>{children}</StyledList>
}

List.defaultProps = {
  defaultIcon: 'dot',
  type: 'unordered',
}

List.propTypes = {
  /** Unordered lists use icons, ordered lists use a counter as bullet points */
  type: propTypes.oneOf(['ordered', 'unordered']),
  children: propTypes.node.isRequired,
  defaultIcon: propTypes.string,
  defaultIconColor: propTypes.string,
}
