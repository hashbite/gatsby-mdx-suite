import styled from '@emotion/styled'
import tw from 'twin.macro'

const FieldLabel = styled.label`
  ${tw``}

  &[for] {
    ${tw`cursor-pointer`}
  }
`

export default FieldLabel
