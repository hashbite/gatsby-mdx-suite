import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import tw from 'twin.macro'
import selectColor from '@gatsby-mdx-suite/helpers/styling/select-color'

const ColorSwatchWrapper = styled.div`
  ${tw`inline-block px-1 text-center text-black`}
`
const ColorSwatchColor = styled.div(
  ({ color }) => css`
    ${tw`
    mx-auto
    w-24
    h-16
    rounded
    shadow
    `}
    background: ${color};
  `
)
const ColorSwatchName = styled.div(
  ({ theme }) => css`
    ${tw`font-bold mb-1 whitespace-nowrap`}
    color: ${selectColor(theme.colors, 'text')};
  `
)
const ColorSwatchValue = styled.div`
  ${tw`text-sm mt-2 text-gray-600`}
  mix-blend-mode: difference;
`

const ColorSwatch = ({ name, color }) => (
  <ColorSwatchWrapper>
    <ColorSwatchName>{name}</ColorSwatchName>
    <ColorSwatchColor color={color} />
    <ColorSwatchValue>{color}</ColorSwatchValue>
  </ColorSwatchWrapper>
)

export default ColorSwatch
