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
 * @example
 * <List>
 * <ListItem icon="check" iconColor="#bada55">Colored example for icon **check**</ListItem>
 * <ListItem icon="circle" iconColor="blue">Colored example for icon **circle**</ListItem>
 * <ListItem icon="dot" iconColor="red-500">Colored example for icon **dot**</ListItem>
 * </List>
 */
const ListItem = ({ icon, iconColor, children, ...props }) => {
  return (
    <StyledListItem {...props}>
      <ListItemIconWrapper>
        <Icon icon={icon} color={iconColor} valign="center" />
      </ListItemIconWrapper>
      <ListItemContent>{children}</ListItemContent>
    </StyledListItem>
  )
}

ListItem.defaultProps = {
  icon: 'dot',
}

ListItem.propTypes = {
  children: propTypes.node.isRequired,
  icon: propTypes.string,
  iconColor: propTypes.string,
}

export default ListItem
