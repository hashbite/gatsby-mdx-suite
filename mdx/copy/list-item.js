import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import Icon from './icon'

const StyledListItem = styled.li(
  ({ iconColor, type }) => css`
    ${type === 'ordered' &&
    css`
      &:before {
        color: ${iconColor};
      }
    `}
  `
)

const ListItemIcon = styled(Icon)`
  ${tw`absolute left-0`}
  top: 0.35em;
`
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
const ListItem = ({ icon, iconColor, children, type, ...props }) => {
  return (
    <StyledListItem {...props} iconColor={iconColor}>
      {type === 'unordered' && (
        <ListItemIcon icon={icon} color={iconColor} valign="center" />
      )}
      {children}
    </StyledListItem>
  )
}

ListItem.defaultProps = {
  type: 'unordered',
}

ListItem.propTypes = {
  children: propTypes.node,
  /** Overwrite the default icon set by the wrapping `<List/>` component. */
  icon: propTypes.string,
  /** Overwrite the default icon color set by the wrapping `<List/>` component. */
  iconColor: propTypes.string,
  /** Unordered lists use icons, ordered lists use a counter as bullet points. This will automatically be set by the wrapping `<List/>` component. */
  type: propTypes.oneOf(['ordered', 'unordered']),
}

export default ListItem
