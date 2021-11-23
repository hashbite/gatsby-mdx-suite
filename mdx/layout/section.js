import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import tw from 'twin.macro'

import Image from 'gatsby-theme-mdx-suite-core/src/components/image'
import Video from '@gatsby-mdx-suite/mdx-video/video-renderer'

import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'
import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'
import convertToFlexAlignment from '@gatsby-mdx-suite/helpers/styling/convert-to-flex-alignment'
import selectColor from '@gatsby-mdx-suite/helpers/styling/select-color'
import debugMode from '@gatsby-mdx-suite/helpers/styling/debug-mode'

const BackgroundVideo = styled(Video)`
  ${tw`static`}
`

const SectionWrapper = styled.section(({ textShadow, theme, minHeight }) => {
  return css`
    ${tw`relative`}

    background: ${theme.colors.background};
    color: ${theme.colors.text};

    ${minHeight &&
    css`
      min-height: ${minHeight};
    `}

    ${textShadow &&
    css`
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.13);
    `}

    ${debugMode({ color: 'red', title: 'Section', type: 'border' })}
  `
})

const SectionContentWrapper = styled.div(
  ({ minHeight, verticalAlign, horizontalAlign }) => {
    return css`
      ${tw`relative`}
      ${(minHeight || horizontalAlign) && tw`flex flex-col h-full w-full`}

      ${minHeight &&
      css`
        min-height: ${minHeight};
        justify-content: ${verticalAlign};
      `}

      ${horizontalAlign &&
      css`
        align-items: ${horizontalAlign};
      `}
    `
  }
)

const SectionContent = styled.div(
  ({ horizontalAlign, ...props }) => css`
    ${horizontalAlign
      ? tw`px-content-column-padding`
      : centerToContentColumn(props)}

    padding-top: ${calcGapValue(props.gap, props.theme)};
    padding-bottom: ${calcGapValue(props.gap, props.theme)};

    ${debugMode({
      color: 'tomato',
      title: 'Section Content',
      labelPosition: 'outside',
    })}
  `
)

function calcGapValue(gap, theme) {
  const customSize = gap && theme.spacing[gap]
  return customSize || theme.spacing['section-gap']
}

const BackgroundMediaWrapper = styled.div(
  () => css`
    ${tw`absolute z-0 inset-0 w-full h-full`}
    overflow: hidden;

    & video {
      ${tw`absolute inset-0 z-10 object-cover object-center w-full h-full`}
    }
  `
)

const BackgroundImage = styled(Image)(({ backgroundImageOpacity }) => [
  tw`absolute inset-0 block w-full h-full`,
  backgroundImageOpacity !== '1' &&
    css`
      opacity: ${backgroundImageOpacity};
    `,
])

const BackgroundMediaOverlay = styled.div(
  ({ overlayColor, overlayOpacity, theme }) => css`
    ${tw`absolute inset-0 z-20`}
    background: ${selectColor(theme.colors, overlayColor)};
    opacity: ${overlayOpacity};
  `
)

/**
 * Sections are content seperators and serve multiple purposes:
 *
 * * Ensures the given content is rendered within the content column
 * * Adds a gap between multiple sections
 * * They can be colored and supports background images
 *
 * @example <caption>Default</caption>
 * <Section>
 *
 * # Doggy
 *
 * On a plain section, without any styling
 *
 * ![picture of a dog](https://source.unsplash.com/400x300/weekly?dog)
 *
 * </Section>

 * @example <caption>Coloring</caption>
 * <Section colorSet="teal">
 *
 * # Cats
 *
 * On a section with the color set `teal` applied.
 *
 * <Columns>
 * <Image src="https://source.unsplash.com/400x300/weekly?cat" alt="Picture of a cat" />
 * <Image src="https://source.unsplash.com/400x300/weekly?cat" alt="Picture of a cat" />
 * </Columns>
 * </Section>

 * @example <caption>Custom colors</caption>
 * <Section colors={{ background:"tomato", primary: "#48C9B0", secondary: "heading"}}>
 *
 * # Parrots
 *
 * On a section with custom background, primary and secondary color
 *
 * <Columns>
 * <Image src="https://source.unsplash.com/400x300/weekly?parrot" alt="Picture of a parrot" />
 * <Image src="https://source.unsplash.com/400x300/weekly?parrot" alt="Picture of a parrot" />
 * </Columns>
 * </Section>
 *
 * @example <caption>Background image</caption>
 * <Section backgroundImageId="randomPictureId">
 *
 * # Ghosts
 *
 * On a section with a background image
 *
 * <Columns>
 * <Image src="https://source.unsplash.com/400x300/weekly?ghost" alt="Picture of a ghost" />
 * <Image src="https://source.unsplash.com/400x300/weekly?ghost" alt="Picture of a ghost" />
 * </Columns>
 * </Section>
 */
export default function Section({
  children,
  backgroundImageId,
  backgroundImageOpacity,
  colorSet,
  colors,
  textShadow,
  gap,
  minHeight,
  verticalAlign,
  horizontalAlign,
  backgroundVideoId,
  overlayOpacity,
  overlayColor,
  backgroundForceRendering,
  ...props
}) {
  if (backgroundImageId && !colorSet) {
    colorSet = 'background-image'
  }
  const hasBackgroundMedia = !!(backgroundImageId || backgroundVideoId)
  return (
    <ColorSet name={colorSet} {...colors}>
      <SectionWrapper textShadow={textShadow} minHeight={minHeight} {...props}>
        {hasBackgroundMedia && (
          <BackgroundMediaWrapper>
            {parseFloat(overlayOpacity) > 0 && (
              <BackgroundMediaOverlay
                overlayOpacity={overlayOpacity}
                overlayColor={overlayColor}
              />
            )}
            {backgroundImageId && (
              <BackgroundImage
                backgroundImageOpacity={backgroundImageOpacity}
                contextKey="screen"
                id={backgroundImageId}
                fit="cover"
              />
            )}
            {backgroundVideoId && (
              <BackgroundVideo
                autoPlay
                loop
                muted
                controls={false}
                id={backgroundVideoId}
                forceRendering={backgroundForceRendering}
              />
            )}
          </BackgroundMediaWrapper>
        )}
        {children && (
          <SectionContentWrapper
            minHeight={minHeight}
            verticalAlign={convertToFlexAlignment(verticalAlign)}
            horizontalAlign={convertToFlexAlignment(horizontalAlign)}
          >
            <SectionContent
              gap={gap}
              horizontalAlign={convertToFlexAlignment(horizontalAlign)}
            >
              {children}
            </SectionContent>
          </SectionContentWrapper>
        )}
      </SectionWrapper>
    </ColorSet>
  )
}

Section.snippets = [
  {
    title: 'Full Screen Background Image',
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
    ),
    snippet: `<Section backgroundImageId="randomPictureId">\${1:foo}</Section>`,
  },
  {
    title: 'Full Screen Background Video',
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z"
          clipRule="evenodd"
        />
      </svg>
    ),
    snippet: `<Section backgroundVideoId="randomVideoId">\${1}</Section>`,
  },
]

Section.defaultProps = {
  colorSet: null,
  colors: {},
  textShadow: false,
  verticalAlign: 'center',
  backgroundImageOpacity: '1',
  overlayOpacity: 0,
  overlayColor: 'black',
  backgroundForceRendering: false,
}

Section.propTypes = {
  children: propTypes.node,
  /** Id the background image */
  backgroundImageId: propTypes.string,
  /** Set the opacity for the background image */
  backgroundImageOpacity: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
  ]),
  /** Id of the background video */
  backgroundVideoId: propTypes.string,
  /** Define a color set for this box */
  colorSet: propTypes.string,
  /** Set the opacity of the background media overlay */
  overlayOpacity: propTypes.oneOfType([propTypes.string, propTypes.number]),
  /** Set the color for the background media overlay */
  overlayColor: propTypes.string,
  /** Overwrite specific colors */
  colors: propTypes.object,
  /** Optional slight text shadow to increase readability when using background images */
  textShadow: propTypes.bool,
  /** Overwrite default vertical margin. See <Link to="/docs/style-guide/#sizes">theme documentation for available sizes</Link> */
  gap: propTypes.string,
  /** Set the minimum size for the section. Usually used with `100vh` to achieve full screen sizes. See <Link to="/docs/style-guide/#sizes">theme documentation for available sizes</Link> */
  minHeight: propTypes.string,
  /** Vertical alignment if the available space exceeds the content height */
  verticalAlign: propTypes.oneOf(['start', 'center', 'end']),
  /** Horizontal alignment. Will detach the content from the content column. */
  horizontalAlign: propTypes.oneOf(['start', 'center', 'end']),
  /** Force background media to be rendered. Set this to true when a section is likely to be rendered above the fold. */
  backgroundForceRendering: propTypes.bool,
}
