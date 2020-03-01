import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import Image from '@gatsby-mdx-suite/mdx-image/image'
import applyColorSet from '@gatsby-mdx-suite/helpers/styling/apply-color-set'
import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'

const SectionWrapper = styled.section(
  ({ hasBackgroundImage, ...restProps }) => {
    if (hasBackgroundImage && !restProps.colorSet) {
      restProps.colorSet = 'transparent'
    }
    return css`
      ${tw`relative`}

      ${applyColorSet(restProps)}

      ${hasBackgroundImage &&
        css`
          text-shadow: 0 0 5px rgba(0, 0, 0, 0.13);
        `}
    `
  }
)

const SectionContentWrapper = styled.div(
  (props) => css`
    ${centerToContentColumn(props)}

    ${tw`relative z-10 py-8 sm:py-16`}
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
 * <Section backgroundColor="tomato" primaryColor="#48C9B0" secondaryColor="skyblue">
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
export default function Section({ children, backgroundImageId, ...restProps }) {
  return (
    <SectionWrapper {...restProps} hasBackgroundImage={!!backgroundImageId}>
      {backgroundImageId && (
        <BackgroundImageWrapper>
          <Image contextKey="background" id={backgroundImageId} fit="cover" />
        </BackgroundImageWrapper>
      )}
      <SectionContentWrapper>{children}</SectionContentWrapper>
    </SectionWrapper>
  )
}

Section.defaultProps = {}

Section.propTypes = {
  children: propTypes.node.isRequired,
  /** image id to display as background image */
  backgroundImageId: propTypes.string,
  /* Apply color set to this element and all children */
  colorSet: propTypes.string,
  /* Set background color for this element */
  backgroundColor: propTypes.string,
  /* Set primary color for this element and all children */
  primaryColor: propTypes.string,
  /* Set secondary color for this element and all children */
  secondaryColor: propTypes.string,
}
