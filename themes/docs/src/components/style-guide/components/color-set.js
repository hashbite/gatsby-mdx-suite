import React from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'

import CTA from '@gatsby-mdx-suite/mdx-link/cta'
import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'

import { ColorSwatches } from '../styles'
import ColorSwatch from './color-swatch'

const ColorSetWrapper = styled.div`
  ${tw`p-4`}
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`
const ColorSetTitle = tw.h2`mb-4 text-center text-3xl`

const ColorSetDemo = ({ name, data }) => (
  <ColorSet key={name} name={name}>
    <ColorSetWrapper>
      <ColorSetTitle>{name}</ColorSetTitle>
      <p>This is an example for the {name} color set.</p>
      <p>
        <CTA href="#">Example CTA</CTA>
      </p>
      <h3>Color overrides:</h3>
      <ColorSwatches>
        {Object.keys(data)
          .sort((a, b) => a.localeCompare(b))
          .map((color) => (
            <ColorSwatch key={color} color={data[color]} name={color} />
          ))}
      </ColorSwatches>
    </ColorSetWrapper>
  </ColorSet>
)

export default ColorSetDemo
