import { css } from '@emotion/core'
import tw from 'twin.macro'

const centerToContentColumn = ({
  theme: {
    config: { contentColumnMaxWidth },
  },
}) => css`
  ${tw`box-content mx-auto w-full px-8`}
  max-width: ${contentColumnMaxWidth};
`

export default centerToContentColumn
