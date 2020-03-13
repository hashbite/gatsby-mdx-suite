import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import Image from '@gatsby-mdx-suite/mdx-image/image'
import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'
import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'

const SectionWrapper = styled.section(({ hasBackgroundImage, theme }) => {
  return css`
    ${tw`relative overflow-hidden`}

    background: ${theme.colors.background};
    color: ${theme.colors.text};

    ${hasBackgroundImage &&
      css`
        ${tw`text-white`}
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.13);
      `}
  `
})

const SectionContentWrapper = styled.div(
  (props) => css`
    ${tw`relative z-10`}
    ${centerToContentColumn(props)}

    padding-top: calc(${props.theme.spacing['content-gap']} / 2);
    padding-bottom: calc(${props.theme.spacing['content-gap']} / 2);
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
 *
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
}) {
  return (
    <ColorSet name={colorSet} {...colors}>
      <SectionWrapper hasBackgroundImage={!!backgroundImageId}>
        {backgroundImageId && (
          <BackgroundImageWrapper>
            <Image contextKey="background" id={backgroundImageId} fit="cover" />
          </BackgroundImageWrapper>
        )}
        <SectionContentWrapper>{children}</SectionContentWrapper>
      </SectionWrapper>
    </ColorSet>
  )
}

Section.defaultProps = {
  colorSet: null,
  colors: {},
}

Section.propTypes = {
  children: propTypes.node.isRequired,
  /** image id to display as background image */
  backgroundImageId: propTypes.string,
  /* Define a color set for this box */
  colorSet: propTypes.string,
  /* Overwrite specific colors */
  colors: propTypes.object,
}
