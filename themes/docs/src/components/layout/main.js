import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

const MainWrapper = styled.div(
  ({ theme }) => css`
    ${tw`overflow-x-scroll`}

    grid-area: main;
  `
)

export default MainWrapper
