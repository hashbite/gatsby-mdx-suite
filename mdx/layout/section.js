import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Image from '@gatsby-mdx-suite/mdx-basic/image'
import { applyColorSet, centerToContentColumn } from '@gatsby-mdx-suite/helpers'

const SectionWrapper = styled.section`
  position: relative;
  ${applyColorSet}
`

const SectionContentWrapper = styled.div(
  (props) => css`
    ${centerToContentColumn(props)}

    position: relative;
    z-index: 2;
    padding-top: ${props.theme.spacing.s2}px;
    padding-bottom: ${props.theme.spacing.s2}px;

    @media (min-width: ${props.theme.breakpoints[0]}) {
      padding-top: ${props.theme.spacing.s4}px;
      padding-bottom: ${props.theme.spacing.s4}px;
    }

    ${props.hasBackgroundImage &&
      css`
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.13);
      `}
  `
)

const BackgroundImageWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  /* Hack gatsby-image to act as background image */
  & .gatsby-image-wrapper {
    position: static !important;
  }

  & img {
    height: 100%;
  }
`

export default function Section({ children, backgroundImageId, ...restProps }) {
  return (
    <SectionWrapper {...restProps}>
      {backgroundImageId && (
        <BackgroundImageWrapper>
          <Image contextKey="background" id={backgroundImageId} />
        </BackgroundImageWrapper>
      )}
      <SectionContentWrapper hasBackgroundImage={!!backgroundImageId}>
        {children}
      </SectionContentWrapper>
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
