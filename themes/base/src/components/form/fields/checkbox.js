import React from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'

const CheckboxInput = styled.input`
  ${tw`inline-block`}
`

const Checkbox = (props) => <CheckboxInput type="checkbox" {...props} />

export default Checkbox
