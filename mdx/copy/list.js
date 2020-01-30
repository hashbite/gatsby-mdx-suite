import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const ListWrapper = styled.div``
const ListTitle = styled.h3`
  margin-top: ${({ theme }) => theme.spacing.s1}px;
  font-weight: 500;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey000};
  text-transform: uppercase;
  opacity: 0.5;
`

export const ListItem = styled.li`
  list-style: none;
  padding-left: ${({ theme }) => theme.spacing.s2}px;
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 1em auto;
  font-weight: bold;
`

const ActualList = styled.ul(({ theme, type, colorSet }) => {
  const color = theme.colors.sets[colorSet].bg.replace('#', '%23')

  return css`
    margin: ${theme.spacing.s1}px 0 ${theme.spacing.s2}px;
    padding: 0;

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

export function List({ type, title, children, colorSet }) {
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
  colorSet: 'blue'
}

List.propTypes = {
  title: propTypes.string,
  type: propTypes.string,
  colorSet: propTypes.string,
  children: propTypes.node.isRequired
}
