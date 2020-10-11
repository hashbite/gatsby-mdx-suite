import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import Image from '@gatsby-mdx-suite/mdx-image/image'
import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'
import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'
import convertToFlexAlignment from '@gatsby-mdx-suite/helpers/styling/convert-to-flex-alignment'

const SectionWrapper = styled.section(
  ({ textShadow, theme, minHeight, verticalAlign, horizontalAlign }) => {
    return css`
      ${tw`relative overflow-hidden`}

      background: ${theme.colors.background};
      color: ${theme.colors.text};

      ${(minHeight || horizontalAlign) && tw`flex flex-col`}

      ${minHeight &&
      css`
        min-height: ${minHeight};
        justify-content: ${verticalAlign};
      `}

      ${horizontalAlign &&
      css`
        align-items: ${horizontalAlign};
      `}

      ${textShadow &&
      css`
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.13);
      `}
    `
  }
)

function calcGapValue(gap, theme) {
  const customSize = gap && theme.spacing[gap]
  return customSize || theme.spacing['content-gap']
}

const SectionContentWrapper = styled.div(
  ({ horizontalAlign, ...props }) => css`
    ${tw`relative z-10`}
    ${!horizontalAlign && centerToContentColumn(props)}

    margin-top: ${calcGapValue(props.gapTop || props.gap, props.theme)};
    margin-bottom: ${calcGapValue(props.gapBottom || props.gap, props.theme)};
  `
)

const BackgroundImageWrapper = styled.div`
  ${tw`absolute z-0 inset-0`}

  /* Hack gatsby-image to act as background image */
  & .gatsby-image-wrapper {
    position: static !important;
  }

  & img {
    height: 100%;
  }
`
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
  colorSet,
  colors,
  textShadow,
  gap,
  minHeight,
  verticalAlign,
  horizontalAlign,
}) {
  return (
    <ColorSet name={colorSet} {...colors}>
      <SectionWrapper
        textShadow={textShadow}
        minHeight={minHeight}
        verticalAlign={convertToFlexAlignment(verticalAlign)}
        horizontalAlign={convertToFlexAlignment(horizontalAlign)}
      >
        {backgroundImageId && (
          <BackgroundImageWrapper>
            <Image contextKey="screen" id={backgroundImageId} fit="cover" />
          </BackgroundImageWrapper>
        )}
        {children && (
          <SectionContentWrapper
            gap={gap}
            horizontalAlign={convertToFlexAlignment(horizontalAlign)}
          >
            {children}
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
}

Section.propTypes = {
  children: propTypes.node,
  /** image id to display as background image */
  backgroundImageId: propTypes.string,
  /** Define a color set for this box */
  colorSet: propTypes.string,
  /** Overwrite specific colors */
  colors: propTypes.object,
  /** Optional slight text shadow to increase readability when using background images */
  textShadow: propTypes.bool,
  /** Overwrite default horizontal content gap. See <Link to="/docs/theme#sizes">theme documentation for available sizes</Link> */
  gap: propTypes.string,
  /** Set the minimum size for the section. Usually used with `100vh` to achieve full screen sizes. See <Link to="/docs/theme#sizes">theme documentation for available sizes</Link> */
  minHeight: propTypes.string,
  /** Vertical alignment if the available space exceeds the content height */
  verticalAlign: propTypes.oneOf(['start', 'center', 'end']),
  /** Horizontal alignment. Will detach the content from the content column. */
  horizontalAlign: propTypes.oneOf(['start', 'center', 'end']),
}
