import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import tw from 'twin.macro'

import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'

export const StyleGuideSection = tw.section`my-16`
const HeadlineWrapper = styled.div`
  ${tw`bg-gray-600 text-white`}
`
const Headline = styled.h1(
  (props) => css`
    ${tw`mt-0 py-8 text-4xl md:text-6xl`}
    ${centerToContentColumn(props)}
  `
)
export const StyleGuideSectionHeader = ({ children }) => (
  <HeadlineWrapper>
    <Headline>{children}</Headline>
  </HeadlineWrapper>
)
export const StyleGuideSectionContent = styled.div(
  ({ fullWidth = false, ...props }) => css`
    ${tw`py-8 overflow-x-scroll`}
    ${centerToContentColumn(props)}

    ${fullWidth && tw`max-w-full`}
  `
)

export const ColorSwatches = tw.div`flex gap-4 mb-8 flex-wrap`

export const Table = styled.table`
  ${tw`table-auto w-full`}

  th, td {
    ${tw`border border-gray-300 p-2`}
  }
`
export const GridTwoColumns = tw.div`grid grid-cols-1 md:grid-cols-2 gap-4`
export const GridThreeColumns = tw.div`grid grid-cols-1 sm:grid-cols-3 gap-4`
