import React, { useContext, useMemo } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import tw from 'twin.macro'

import IconsContext from '@gatsby-mdx-suite/contexts/icons'
import Icon from 'gatsby-theme-mdx-suite-base/src/components/icon'

import ColorSwatch from './components/color-swatch'
import ColorSet from './components/color-set'

import {
  StyleGuideSection,
  StyleGuideSectionContent,
  StyleGuideSectionHeader,
  ColorSwatches,
} from './styles'

const RawWrapper = tw.pre`my-4 p-4 border border-gray-500 overflow-scroll bg-gray-200`
const ColorSets = tw.div`grid gap-grid-gap grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`

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

const Grid = tw.div`grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4`
const GridItem = tw.div`text-center`
const GridItemTitle = tw.div`mt-4 text-sm text-gray-800`
const GridItemContent = tw.div``

function StyleGuideConfig() {
  const theme = useTheme()
  const icons = useContext(IconsContext)

  const colors = useMemo(() => {
    const presortedColors = Object.keys(theme.colors)
      .filter((name) => name !== 'sets')
      .sort((a, b) => a.localeCompare(b))

    const singleColors = presortedColors
      .filter((name) => typeof theme.colors[name] === 'string')
      .map((name) => ({ name, value: theme.colors[name] }))
    const palettes = presortedColors
      .filter((name) => typeof theme.colors[name] === 'object')
      .map((name) => ({ name, value: theme.colors[name] }))

    return (
      <>
        <h2>Core Colors</h2>
        <ColorSwatches>
          {singleColors.map(({ name, value }, i) => (
            <ColorSwatch key={i} color={value} name={name} />
          ))}
        </ColorSwatches>
        <h2>Color Palettes</h2>
        {palettes.map(({ name, value }, i) => (
          <ColorSwatches>
            {Object.keys(value).map((colorVariant, i) => (
              <ColorSwatch
                key={i}
                color={value[colorVariant]}
                name={`${name}-${colorVariant}`}
              />
            ))}
          </ColorSwatches>
        ))}
      </>
    )
  }, [theme.colors])

  const colorSets = useMemo(() => {
    return Object.keys(theme.colors.sets)
      .sort((a, b) => a.localeCompare(b))
      .map((name) => <ColorSet name={name} data={theme.colors.sets[name]} />)
  }, [theme.colors])

  return (
    <>
      <StyleGuideSection>
        <div id="colors" />
        <StyleGuideSectionHeader>Colors</StyleGuideSectionHeader>
        <StyleGuideSectionContent>{colors}</StyleGuideSectionContent>
      </StyleGuideSection>
      <StyleGuideSection>
        <div id="color-sets" />
        <StyleGuideSectionHeader>Color Sets</StyleGuideSectionHeader>
        <StyleGuideSectionContent fullWidth>
          <ColorSets>{colorSets}</ColorSets>
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
