import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import tw from 'twin.macro'

import IconsContext from '@gatsby-mdx-suite/contexts/icons'
import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'
import Icon from 'gatsby-theme-mdx-suite-base/src/components/icon'

import {
  StyleGuideSection,
  StyleGuideSectionContent,
  StyleGuideSectionHeader,
} from './styles'

const RawWrapper = tw.pre`my-4 p-4 border border-gray-500 overflow-scroll bg-gray-200`
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

    &:before {
      content: '${color}';
      color: white;
      mix-blend-mode: difference;
    }
  `
)

const Breakpoints = tw.div`flex flex-col items-center overflow-x-scroll`

const Breakpoint = styled.div(
  ({ width }) => css`
    ${tw`mt-8 border border-red-300 text-center`}
    width: ${width};
    min-height: 0.8rem;
    border-top: none;
  `
)

const Length = styled.div(
  ({ width }) => css`
    ${tw`border border-red-300 text-center`}
    width: ${width};
    min-height: 0.8rem;
    border-top: none;
  `
)

const Sizes = tw.table`table-auto`

const FontPreview = styled.div`
  & + & {
    ${tw`mt-12`}
  }
`

const Grid = tw.div`grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4`
const GridItem = tw.div`text-center`
const GridItemTitle = tw.div`mt-4 text-sm text-gray-800`
const GridItemContent = tw.div``

const ColorSetTitle = tw.h2`mb-4`

const ColorSwatches = tw.div`flex gap-4`
const ColorSwatchWrapper = tw.div``

function StyleGuideConfig() {
  const theme = useTheme()
  const icons = useContext(IconsContext)

  return (
    <>
      <StyleGuideSection>
        <StyleGuideSectionHeader>Style Guide Config</StyleGuideSectionHeader>
        <StyleGuideSectionContent>
          <p>
            This gives you an overview about the theme configuration of this
            project.
          </p>
        </StyleGuideSectionContent>
      </StyleGuideSection>
      <StyleGuideSection>
        <div id="colors" />
        <StyleGuideSectionHeader>Colors</StyleGuideSectionHeader>
        <StyleGuideSectionContent>
          <table>
            <tbody>
              {Object.keys(theme.colors)
                .sort((a, b) => a.localeCompare(b))
                .filter((name) => name !== 'sets')
                .map((name) => {
                  const colorData = theme.colors[name]
                  return (
                    <tr key={name}>
                      <td>
                        <strong>{name}:</strong>
                      </td>
                      <td>
                        {typeof colorData === 'object' ? (
                          <ColorSwatches>
                            {Object.keys(colorData).map((colorVariant, i) => (
                              <ColorSwatchWrapper key={i}>
                                <ColorSwatch color={colorData[colorVariant]} />
                                <br />
                                {colorVariant}
                              </ColorSwatchWrapper>
                            ))}
                          </ColorSwatches>
                        ) : (
                          <ColorSwatch color={colorData} />
                        )}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </StyleGuideSectionContent>
      </StyleGuideSection>
      <StyleGuideSection>
        <div id="color-sets" />
        <StyleGuideSectionHeader>
          <h1>Color Sets</h1>
        </StyleGuideSectionHeader>
        <StyleGuideSectionContent>
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
        </StyleGuideSectionContent>
      </StyleGuideSection>
      <StyleGuideSection>
        <div id="icons" />
        <StyleGuideSectionHeader>Icons</StyleGuideSectionHeader>
        <StyleGuideSectionContent>
          <Grid>
            {[...icons.keys()].map((name) => {
              return (
                <GridItem key={name}>
                  <GridItemContent>
                    <Icon icon={name} />
                  </GridItemContent>
                  <GridItemTitle>{name}</GridItemTitle>
                </GridItem>
              )
            })}
          </Grid>
        </StyleGuideSectionContent>
      </StyleGuideSection>
      <StyleGuideSection>
        <div id="breakpoints" />
        <StyleGuideSectionHeader>Breakpoints</StyleGuideSectionHeader>
        <Breakpoints>
          {Object.keys(theme.screens).map((name) => (
            <Breakpoint key={name} width={theme.screens[name]}>
              {name} ({theme.screens[name]})
            </Breakpoint>
          ))}
        </Breakpoints>
      </StyleGuideSection>
      <StyleGuideSection>
        <div id="sizes" />
        <StyleGuideSectionHeader>Sizes</StyleGuideSectionHeader>
        <StyleGuideSectionContent>
          <Sizes>
            {Object.keys(theme.spacing).map((size) => (
              <tr key={size}>
                <td>{size}</td>
                <td>{theme.spacing[size]}</td>
                <td>
                  <Length width={theme.spacing[size]} />
                </td>
              </tr>
            ))}
          </Sizes>
        </StyleGuideSectionContent>
      </StyleGuideSection>
      <StyleGuideSection>
        <div id="fonts" />
        <StyleGuideSectionHeader>Fonts</StyleGuideSectionHeader>
        <StyleGuideSectionContent>
          {Object.keys(theme.fontFamily).map((font) => (
            <FontPreview key={font} font={font}>
              <h1
                css={css`
                  font-family: ${theme.fontFamily[font].join(', ')};
                `}
              >
                <strong>{font} h1:</strong> The quick brown fox jumps over the
                lazy dog
              </h1>
              <h2
                css={css`
                  font-family: ${theme.fontFamily[font].join(', ')};
                `}
              >
                <strong>{font} h2:</strong> The quick brown fox jumps over the
                lazy dog
              </h2>
              <h3
                css={css`
                  font-family: ${theme.fontFamily[font].join(', ')};
                `}
              >
                <strong>{font} h3:</strong> The quick brown fox jumps over the
                lazy dog
              </h3>
              <h4
                css={css`
                  font-family: ${theme.fontFamily[font].join(', ')};
                `}
              >
                <strong>{font} h4:</strong> The quick brown fox jumps over the
                lazy dog
              </h4>
              <h5
                css={css`
                  font-family: ${theme.fontFamily[font].join(', ')};
                `}
              >
                <strong>{font} h5:</strong> The quick brown fox jumps over the
                lazy dog
              </h5>
              <h6
                css={css`
                  font-family: ${theme.fontFamily[font].join(', ')};
                `}
              >
                <strong>{font} h6:</strong> The quick brown fox jumps over the
                lazy dog
              </h6>
              <p
                css={css`
                  font-family: ${theme.fontFamily[font].join(', ')};
                `}
              >
                <strong>{font} p:</strong> The quick brown fox jumps over the
                lazy dog
              </p>
              <p>
                <strong>Font families: </strong>
                {theme.fontFamily[font].join(', ')}
              </p>
            </FontPreview>
          ))}
        </StyleGuideSectionContent>
      </StyleGuideSection>
      <StyleGuideSection>
        <div id="raw" />
        <StyleGuideSectionHeader>
          Raw processed theme config
        </StyleGuideSectionHeader>
        <StyleGuideSectionContent>
          <RawWrapper>{JSON.stringify(theme, null, 2)}</RawWrapper>
        </StyleGuideSectionContent>
      </StyleGuideSection>
    </>
  )
}

export default StyleGuideConfig
