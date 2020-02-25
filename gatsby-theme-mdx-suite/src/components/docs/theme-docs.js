import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { useThemeUI, Styled } from 'theme-ui'
import tw from 'twin.macro'

import Layout from './layout/layout'
import LayoutMain from './layout/main'
import { applyColorSet } from '@gatsby-mdx-suite/helpers'

const ThemeRawWrapper = tw.pre`my-4 p-4 border border-color-gray-500 overflow-scroll bg-gray-200`
const ColorSets = tw.div`flex flex-wrap mb-32`

const applyTransparentBackground = ({ backgroundTransparent }) =>
  backgroundTransparent &&
  css`
    background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  `

const ColorSet = styled.div`
  ${applyColorSet}
  ${applyTransparentBackground}
  ${tw`m-2 p-8`}
`

const ColorSetTitle = tw.h1``

function ThemeDocs() {
  const context = useThemeUI()
  const { theme, colorMode } = context

  return (
    <Layout>
      <LayoutMain>
        <Styled.h1>Theme documentation</Styled.h1>
        <Styled.h2>Color Sets</Styled.h2>
        <ColorSets>
          {Object.keys(theme.colors.sets).map((name) => {
            const setData = theme.colors.sets[name]
            const background = theme.colors.sets[name].background
            const backgroundTransparent = [null, 'transparent'].includes(
              background
            )

            return (
              <ColorSet
                key={name}
                colorSet={name}
                backgroundTransparent={backgroundTransparent}
              >
                <ColorSetTitle>{name}</ColorSetTitle>
                {Object.keys(setData).map((type, i) => {
                  const value = setData[type]
                  if (!value) {
                    return null
                  }
                  return (
                    <div key={i}>
                      <strong>{type}:</strong>
                      {value}
                    </div>
                  )
                })}
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
      </LayoutMain>
    </Layout>
  )
}

ThemeDocs.displayName = 'ThemeDocs'

export default ThemeDocs
