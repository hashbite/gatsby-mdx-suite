import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

const ListWrapper = tw.div``
const ListTitle = tw.h3`mt-5 font-bold text-sm text-gray-400 uppercase`

const ListItem = styled.li`
  ${tw`list-none pl-8 ml-4 bg-no-repeat font-bold`}
  background-position: left center;
  background-size: 1em auto;
`

const ActualList = styled.ul(({ theme, type, colorSet }) => {
  const colorSetData = theme.colors.sets[colorSet]
  const color =
    colorSetData && colorSetData.bg
      ? colorSetData.bg.replace('#', '%23')
      : 'currentColor'

  return css`
    ${tw`mt-4 mb-8 p-0`}

    ${ListItem} {
      ${type === 'checkmark'
        ? css`
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14.3 10'%3e%3cpath fill='none' stroke='${color}' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M1.4 5.2L5.2 9 13 1.4' data-name='Path 9564'/%3e%3c/svg%3e");
          `
        : css`
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3e%3cg fill='${color}' stroke='rgba(44%2c148%2c226%2c0.18)' stroke-width='4' data-name='Ellipse 289' transform='translate(4 4)'%3e%3ccircle cx='2' cy='2' r='2' stroke='none'/%3e%3ccircle cx='2' cy='2' r='4' fill='none'/%3e%3c/g%3e%3c/svg%3e");
          `}
    }
  `
})

/**
 * Renders a list with an optional title and customizable bullet points.
 *
 * @example
 * <List title="Very important information:">
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
 * <List type="checkmark">
 *
 * Lists easily become a checkmark list
 *
 * Just change the type
 *
 * And you are done
 *
 * </List>
 */
export default function List({ type, title, children, colorSet }) {
  return (
    <ListWrapper>
      {title && <ListTitle>{title}</ListTitle>}
      <ActualList type={type} colorSet={colorSet}>
        {children}
      </ActualList>
    </ListWrapper>
  )
}

List.defaultProps = {
  type: 'bulletpoint',
  colorSet: 'blue',
}

List.propTypes = {
  title: propTypes.string,
  type: propTypes.string,
  colorSet: propTypes.string,
  children: propTypes.node.isRequired,
}
