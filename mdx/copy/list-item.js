import React from 'react'
import propTypes from 'prop-types'
import tw from 'twin.macro'

import Icon from './icon'

const StyledListItem = tw.li`
  flex
  pb-4 ml-4
  list-none
`

const ListItemIconWrapper = tw.div`flex items-center w-8 justify-center`
const ListItemContent = tw.div`pl-4`

/**
 * Renders a list with an optional title and customizable bullet points.
 *
 * @example
 * <List>
 * <ListItem icon="check">Example for icon **check**</ListItem>
 * <ListItem icon="circle">Example for icon **circle**</ListItem>
 * <ListItem icon="dot">Example for icon **dot**</ListItem>
 * <ListItem icon="dotSmall">Example for icon **dotSmall**</ListItem>
 * <ListItem icon="star">Example for icon **star**</ListItem>
 * <ListItem icon="starOutlined">Example for icon **starOutlined**</ListItem>
 * </List>
 */
const ListItem = ({ icon, children, ...props }) => {
  return (
    <StyledListItem {...props}>
      <ListItemIconWrapper>
        <Icon icon={icon} valign="center" />
      </ListItemIconWrapper>
      <ListItemContent>{children}</ListItemContent>
    </StyledListItem>
  )
}

ListItem.defaultProps = {
  icon: 'dot',
}

ListItem.propTypes = {
  icon: propTypes.string,
  children: propTypes.node.isRequired,
}

export default ListItem
