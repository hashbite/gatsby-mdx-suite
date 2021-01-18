import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

export const StyleGuideSection = tw.section`my-16`
export const StyleGuideSectionHeader = styled.h1(
  () => css`
    ${tw`mt-0 p-4 bg-gray-400`}

    & > * {
      ${tw`mx-auto max-w-6xl px-4`}
    }
  `
)
export const StyleGuideSectionContent = tw.div`mx-auto max-w-6xl py-8 px-4 overflow-x-scroll`
