import React from 'react'
import { useMDXComponents } from '@mdx-js/react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import tw from 'twin.macro'
import {
  StyleGuideSection,
  StyleGuideSectionContent,
  StyleGuideSectionHeader,
} from '../styles'

const FontPreview = styled.div(
  ({ theme, font, ...props }) => css`
    ${tw`mb-16`}

    &, p, h1, h2, h3 ,h4 ,h5 ,h6 {
      font-family: ${theme.fontFamily[font].join(', ')} !important;
    }
  `
)

const FontTitle = styled.div(
  (props) =>
    ({ theme, ...props }) =>
      css`
        ${tw`text-center text-6xl`}
      `
)
const FontWeights = styled.div(
  (props) =>
    ({ theme, ...props }) =>
      css`
        ${tw`
      py-2
      border-2 border-gray-900 border-l-0 border-r-0
      uppercase text-center
    `}
      `
)
const FontWeight = styled.span(
  (props) =>
    ({ theme, weight, ...props }) =>
      css`
        font-weight: ${weight};

        :not(:last-child)::after {
          content: ' | ';
        }
      `
)
const FontDetails = styled.div(
  (props) =>
    ({ theme, ...props }) =>
      css`
        ${tw`
    py-4
    grid grid-cols-2 md:grid-cols-3 gap-4 items-center
    border-b-2 border-gray-900`}
      `
)
const FontDescription = styled.div(
  (props) =>
    ({ theme, ...props }) =>
      css`
        ${tw`py-4 `}
      `
)
const FontMeta = styled.div(
  (props) =>
    ({ theme, ...props }) =>
      css`
        ${tw`
    py-4 px-4
    border-l-2 md:border-r-2 border-gray-900
  `}
      `
)
const FontInitials = styled.div(
  (props) =>
    ({ theme, ...props }) =>
      css`
        ${tw`text-center`}
        font-size: 6rem;
      `
)
const FontAlphabet = styled.div(
  (props) =>
    ({ theme, ...props }) =>
      css`
        ${tw`text-center`}
      `
)
const FontFamilies = styled.div(
  (props) =>
    ({ theme, ...props }) =>
      css`
        ${tw`
    py-4
    col-span-2 md:col-span-1
    border-t-2 md:border-t-0 border-gray-900
    `}

        ul {
          ${tw`grid grid-cols-2 md:grid-cols-1`}
        }
      `
)
const FontHeadlines = styled.div(
  (props) =>
    ({ theme, ...props }) =>
      css`
        ${tw`
    py-4
    border-b-2 border-gray-900
    `}
      `
)

const coreFonts = ['headline', 'body']

function SectionTypography() {
  const mdxComponents = useMDXComponents()
  const theme = useTheme()

  return (
    <StyleGuideSection>
      <div id="fonts" />
      <div id="typography" />
      <StyleGuideSectionHeader>Typography</StyleGuideSectionHeader>
      <StyleGuideSectionContent>
        {Object.keys(theme.fontFamily)
          .sort((a, b) => {
            const aCoreIndex = coreFonts.indexOf(a)
            const bCoreIndex = coreFonts.indexOf(b)

            if (aCoreIndex === bCoreIndex) {
              return a.localeCompare(b)
            }

            return aCoreIndex > bCoreIndex ? -1 : 1
          })
          .map((font) => (
            <FontPreview key={font} font={font}>
              <FontTitle>{font}</FontTitle>
              <FontWeights>
                {Object.keys(theme.fontWeight).map((name) => (
                  <FontWeight key={name} weight={theme.fontWeight[name]}>
                    {name}
                  </FontWeight>
                ))}
              </FontWeights>
              <FontDetails>
                <FontDescription>
                  <p>
                    Typography is the art and technique of arranging type to
                    make written language legible, readable and appealing when
                    displayed.
                  </p>
                  <p>
                    The arrangement of type involves selecting typefaces, point
                    sizes, line lengths, line-spacing (leading), and
                    letter-spacing (tracking), and adjusting the space between
                    pairs of letters (kerning).
                  </p>
                  <p>
                    Typography also may be used as an ornamental and decorative
                    device, unrelated to the communication of information.
                  </p>
                </FontDescription>
                <FontMeta>
                  <FontInitials>Aa</FontInitials>
                  <FontAlphabet>
                    <p>
                      A B C D E F G H I J K L M N<br />O P Q R S T U V W X Y Z Ä
                      Ö Ü
                    </p>
                    <p>
                      a b c d e f g h i j k l m n<br />o p q r s t u v w x y z ä
                      ö ü ß
                    </p>
                    <p>1 2 3 4 5 6 7 8 9 0</p>
                    <p>! @ # $ € &amp; [ ] ^ * ( ) _ - + {'{ }'} " : ?</p>
                  </FontAlphabet>
                </FontMeta>
                <FontFamilies>
                  <h3>Font Families:</h3>
                  <mdxComponents.ul>
                    {theme.fontFamily[font].map((name) => (
                      <mdxComponents.li key={name}>{name}</mdxComponents.li>
                    ))}
                  </mdxComponents.ul>
                </FontFamilies>
              </FontDetails>
              <FontHeadlines>
                {['h6', 'h5', 'h4', 'h3', 'h2', 'h1'].map((level) => {
                  const Headline = mdxComponents[level]
                  return (
                    <Headline key={level}>
                      {level}: The quick brown fox jumps over the lazy dog
                    </Headline>
                  )
                })}
              </FontHeadlines>
            </FontPreview>
          ))}
      </StyleGuideSectionContent>
    </StyleGuideSection>
  )
}

export default SectionTypography
