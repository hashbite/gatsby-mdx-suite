import React from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'

import ErrorMessage from '../decoration/error-message'
import { textFieldStyle } from './styles'

const InputWrapper = styled.div`
  ${tw`w-full`}
`

const Input = styled.input`
  ${textFieldStyle}
`

export default ({ error, ...props }) => (
  <InputWrapper>
    <Input {...props} />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </InputWrapper>
)
