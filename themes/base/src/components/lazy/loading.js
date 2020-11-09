import React from 'react'
import styled from '@emotion/styled'

import tw from 'twin.macro'

const DefaultLoadingWrapper = styled.div`
  ${tw`
    w-full
    p-content-gap
    text-center
    border border-solid border-4 border-gray-800
    bg-gray-700 text-white
  `}
  line-height: 220px;
`

export default () => {
  return <DefaultLoadingWrapper>Loading...</DefaultLoadingWrapper>
}
