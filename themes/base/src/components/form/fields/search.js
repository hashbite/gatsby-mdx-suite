import React from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'

import Icon from '@gatsby-mdx-suite/mdx-copy/icon'

import { textFieldStyle } from './styles'

const SearchWrapper = tw.div`relative`

const SearchLabel = styled.label`
  ${tw`absolute right-0 top-0 bottom-0 px-2
    text-gray-500
    border-solid border border-gray-300
    flex flex-col justify-center
    cursor-pointer
    `}

  span {
    display: block;
  }

  svg {
    display: block !important;
  }
`

const SearchInput = styled.input`
  ${textFieldStyle}

  &:focus + ${SearchLabel} {
    ${tw`border-primary bg-primary text-white`}
  }
`
const Search = (props) => (
  <SearchWrapper>
    <SearchInput type="search" {...props} />
    <SearchLabel htmlFor={props.id}>
      <Icon icon="search" />
    </SearchLabel>
  </SearchWrapper>
)

export default Search
