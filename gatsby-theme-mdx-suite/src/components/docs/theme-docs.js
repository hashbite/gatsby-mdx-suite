import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { useThemeUI, Styled } from 'theme-ui'
import tw from 'twin.macro'

import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'

import Layout from './layout/layout'
import LayoutMain from './layout/main'

const ThemeWrapper = tw.div`pt-8`
const ThemeSection = tw.section`my-16`
const ThemeSectionHeader = styled(Styled.h1)(
  () => css`
    ${tw`mt-0 p-4 bg-gray-400`}

    & > * {
      ${tw`mx-auto max-w-6xl px-4`}
    }
  `
)
const ThemeSectionContent = tw.div`mx-auto max-w-6xl py-8 px-4`
const ThemeRawWrapper = tw.pre`my-4 p-4 border border-color-gray-500 overflow-scroll bg-gray-200`
const ColorSets = tw.div`grid gap-grid-gap grid-cols-2 md:grid-cols-3 lg:grid-cols-4`

const ColorSetWrapper = styled.div`
  ${tw`p-4`}
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

const ColorSwatch = styled.div(
  ({ color }) => css`
  ${tw`
    inline-block px-2 py-1
    rounded
    text-sm
    `}
  background: ${color};

  &:before{
    content: '${color}';
    mix-blend-mode: difference;
  }
`
)

const Breakpoints = tw.div`flex flex-col items-center overflow-x-scroll`

const Breakpoint = styled.div(
  ({ width }) => css`
  ${tw`mt-8 border border-color-red-300 border-t-0 text-center`}
  width: ${width};

  &:before {
    content: '${width}';
  }
`
)

const FontPreview = styled.div`
  & + & {
    ${tw`mt-12`}
  }
`

const ColorSetTitle = tw(Styled.h2)`mb-4`

function ThemeDocs() {
  const context = useThemeUI()
  const { theme, colorMode } = context

  return (
    <Layout title="Theme">
      <LayoutMain>
        <ThemeWrapper>
          <ThemeSection>
            <ThemeSectionHeader>
              <Styled.h1>Theme documentation</Styled.h1>
            </ThemeSectionHeader>
            <ThemeSectionContent>
              This gives you an overview about the theme configuration of this
              project.
            </ThemeSectionContent>
          </ThemeSection>
          <ThemeSection>
            <ThemeSectionHeader>
              <Styled.h1>Colors</Styled.h1>
            </ThemeSectionHeader>
            <ThemeSectionContent>
              <table>
                <tbody>
                  {Object.keys(theme.colors)
                    .filter(
                      (name) =>
                        Array.isArray(theme.colors[name]) ||
                        typeof theme.colors[name] === 'string'
                    )
                    .sort((a, b) => a.localeCompare(b))
                    .map((name) => {
                      const colorData = theme.colors[name]
                      return (
                        <tr key={name}>
                          <td>
                            <strong>{name}:</strong>
                          </td>
                          <td>
                            {Array.isArray(colorData) ? (
                              colorData.map((value, i) => (
                                <ColorSwatch key={i} color={value} />
                              ))
                            ) : (
                              <ColorSwatch color={colorData} />
                            )}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </ThemeSectionContent>
          </ThemeSection>
          <ThemeSection>
            <ThemeSectionHeader>
              <Styled.h2>Color Sets</Styled.h2>
            </ThemeSectionHeader>
            <ThemeSectionContent>
              <ColorSets>
                {Object.keys(theme.colors.sets)
                  .sort((a, b) => a.localeCompare(b))
                  .map((name) => {
                    const setData = theme.colors.sets[name]

                    return (
                      <ColorSet key={name} name={name}>
                        <ColorSetWrapper>
                          <ColorSetTitle>{name}</ColorSetTitle>
                          <table>
                            <thead>
                              <tr>
                                <th>Color</th>
                                <th>Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.keys(setData)
                                .sort((a, b) => a.localeCompare(b))
                                .map((color) => (
                                  <tr key={color}>
                                    <td>
                                      <strong>{color}:</strong>
                                    </td>
                                    <td>
                                      {Array.isArray(setData[color]) ? (
                                        setData[color].map((value, i) => (
                                          <ColorSwatch key={i} color={value} />
                                        ))
                                      ) : (
                                        <ColorSwatch color={setData[color]} />
                                      )}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </ColorSetWrapper>
                      </ColorSet>
                    )
                  })}
              </ColorSets>
            </ThemeSectionContent>
          </ThemeSection>
          <ThemeSection>
            <ThemeSectionHeader>
              <Styled.h2>Breakpoints:</Styled.h2>
            </ThemeSectionHeader>
            <Breakpoints>
              {theme.breakpoints.map((width) => (
                <Breakpoint key={width} width={width} />
              ))}
            </Breakpoints>
          </ThemeSection>
          <ThemeSection>
            <ThemeSectionHeader>
              <Styled.h2>Fonts:</Styled.h2>
            </ThemeSectionHeader>
            <ThemeSectionContent>
              {Object.keys(theme.fonts).map((font) => (
                <FontPreview key={font} font={font}>
                  <Styled.h1
                    css={css`
                      font-family: ${theme.fonts[font]};
                    `}
                  >
                    <strong>{font}:</strong> The quick brown fox jumps over the
                    lazy dog
                  </Styled.h1>
                  <Styled.h2
                    css={css`
                      font-family: ${theme.fonts[font]};
                    `}
                  >
                    <strong>{font}:</strong> The quick brown fox jumps over the
                    lazy dog
                  </Styled.h2>
                  <Styled.h3
                    css={css`
                      font-family: ${theme.fonts[font]};
                    `}
                  >
                    <strong>{font}:</strong> The quick brown fox jumps over the
                    lazy dog
                  </Styled.h3>
                  <Styled.h4
                    css={css`
                      font-family: ${theme.fonts[font]};
                    `}
                  >
                    <strong>{font}:</strong> The quick brown fox jumps over the
                    lazy dog
                  </Styled.h4>
                  <Styled.h5
                    css={css`
                      font-family: ${theme.fonts[font]};
                    `}
                  >
                    <strong>{font}:</strong> The quick brown fox jumps over the
                    lazy dog
                  </Styled.h5>
                  <Styled.h6
                    css={css`
                      font-family: ${theme.fonts[font]};
                    `}
                  >
                    <strong>{font}:</strong> The quick brown fox jumps over the
                    lazy dog
                  </Styled.h6>
                  <Styled.p
                    css={css`
                      font-family: ${theme.fonts[font]};
                    `}
                  >
                    <strong>{font}:</strong> The quick brown fox jumps over the
                    lazy dog
                  </Styled.p>
                </FontPreview>
              ))}
            </ThemeSectionContent>
          </ThemeSection>
          <ThemeSection>
            <ThemeSectionHeader>
              <Styled.h2>Raw processed theme config</Styled.h2>
            </ThemeSectionHeader>
            <ThemeSectionContent>
              <ThemeRawWrapper>
                {JSON.stringify(
                  { keys: Object.keys(context), colorMode, theme },
                  null,
                  2
                )}
              </ThemeRawWrapper>
            </ThemeSectionContent>
          </ThemeSection>
        </ThemeWrapper>
      </LayoutMain>
    </Layout>
  )
}

ThemeDocs.displayName = 'ThemeDocs'

export default ThemeDocs
