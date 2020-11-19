import styled from '@emotion/styled'
import tw from 'twin.macro'

import { textFieldStyle } from './styles'

const TextArea = styled.textarea`
  ${textFieldStyle}
  ${tw`leading-snug`}
  min-height: 10rem;
`

export default TextArea
