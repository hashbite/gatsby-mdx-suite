import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import Image from '@gatsby-mdx-suite/mdx-image/image'
import Video from '@gatsby-mdx-suite/mdx-video/video'

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
    ${tw`relative overflow-hidden`}

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

const SectionContentWrapper = styled.section(
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

    margin-top: ${calcGapValue(props.gap, props.theme)};
    margin-bottom: ${calcGapValue(props.gap, props.theme)};

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
  ({ backgroundImageOpacity }) => css`
    ${tw`absolute z-0 inset-0`}

    /* Hack gatsby-image to act as background image */
    & .gatsby-image-wrapper {
      position: static !important;
    }

    & img {
      height: 100%;
      ${backgroundImageOpacity !== '1' &&
      css`
        opacity: ${backgroundImageOpacity};
      `}
    }

    & video {
      ${tw`absolute inset-0 z-10 object-cover object-center w-full h-full`}
    }
  `
)

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
 * @example
 * <Section>
 *
 * # Doggy
 *
 * On a plain section, without any styling
 *
 * ![picture of a dog](https://source.unsplash.com/400x300/weekly?dog)
 *
 * </Section>
 * @example
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
 * @example
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
 * @example
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
          <BackgroundMediaWrapper
            backgroundImageOpacity={backgroundImageOpacity}
          >
            {parseFloat(overlayOpacity) > 0 && (
              <BackgroundMediaOverlay
                overlayOpacity={overlayOpacity}
                overlayColor={overlayColor}
              />
            )}
            {backgroundImageId && (
              <Image contextKey="screen" id={backgroundImageId} fit="cover" />
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
  /** Overwrite default vertical margin. See <Link to="/docs/theme#sizes">theme documentation for available sizes</Link> */
  gap: propTypes.string,
  /** Set the minimum size for the section. Usually used with `100vh` to achieve full screen sizes. See <Link to="/docs/theme#sizes">theme documentation for available sizes</Link> */
  minHeight: propTypes.string,
  /** Vertical alignment if the available space exceeds the content height */
  verticalAlign: propTypes.oneOf(['start', 'center', 'end']),
  /** Horizontal alignment. Will detach the content from the content column. */
  horizontalAlign: propTypes.oneOf(['start', 'center', 'end']),
  /** Force background media to be rendered. Set this to true when a section is likely to be rendered above the fold. */
  backgroundForceRendering: propTypes.bool,
}
