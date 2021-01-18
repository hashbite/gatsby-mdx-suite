import styled from '@emotion/styled'
import tw from 'twin.macro'
import FieldGroup from './group'

const FieldGroupInline = styled(FieldGroup)`
  ${tw``}

  > * + * {
    ${tw`ml-4`}
  }
`

export default FieldGroupInline
