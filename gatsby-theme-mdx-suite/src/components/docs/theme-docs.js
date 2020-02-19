import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
import { useThemeUI, Styled } from 'theme-ui'
import { applyColorSet } from '@gatsby-mdx-suite/helpers'

const ThemeDocsWrapper = styled.pre`
  ${tw`overflow-scroll p-4`}
`

const ThemeRawWrapper = styled.pre`
  ${tw`my-4 p-4 border border-color-grey-500 overflow-scroll bg-gray-200`}
`

const ColorSets = styled.div`
  ${tw`flex flex-wrap mb-32`}
`
const ColorSet = styled.div(
  ({ theme, colorSet }) => css`
    ${tw`m-2 p-8`}
    ${applyColorSet({ theme, colorSet })}
    ${theme.colors.sets[colorSet].background
      .split(',')[1]
      .includes('transparent') &&
      css`
        background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
          linear-gradient(-45deg, #ccc 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #ccc 75%),
          linear-gradient(-45deg, transparent 75%, #ccc 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
      `}
  `
)
const ColorSetTitle = styled.h1``

function ThemeDocs() {
  const context = useThemeUI()
  const { theme, colorMode } = context

  return (
    <ThemeDocsWrapper>
      <Styled.h1>Theme documentation</Styled.h1>
      <Styled.h2>Color Sets</Styled.h2>
      <ColorSets>
        {Object.keys(theme.colors.sets).map((name) => {
          const setData = theme.colors.sets[name]
          return (
            <ColorSet key={name} colorSet={name}>
              <ColorSetTitle>{name}</ColorSetTitle>
              {JSON.stringify(setData, null, 2)}
            </ColorSet>
          )
        })}
      </ColorSets>
      <Styled.h2>Raw processed theme config</Styled.h2>
      <ThemeRawWrapper>
        {JSON.stringify(
          { keys: Object.keys(context), colorMode, theme },
          null,
          2
        )}
      </ThemeRawWrapper>
    </ThemeDocsWrapper>
  )
}

ThemeDocs.displayName = 'ThemeDocs'

export default ThemeDocs
