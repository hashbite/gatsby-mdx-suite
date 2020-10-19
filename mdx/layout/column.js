import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
import { cx } from 'emotion'
import Observer from '@researchgate/react-intersection-observer'

import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'
import Image from '@gatsby-mdx-suite/mdx-image/image'
import useAnimation from '@gatsby-mdx-suite/helpers/styling/use-animation'

const StyledColumn = styled.div(
  ({ theme, minAspectRatio, backgroundImage }) => css`
    ${tw`relative`}

    background: ${theme.colors.background};
    color: ${theme.colors.text};

    ${minAspectRatio &&
    css`
      &::before {
        content: '';
        width: 1px;
        margin-left: -1px;
        float: left;
        height: 0;
        padding-top: calc(100% / (${minAspectRatio}));
      }
      &::after {
        content: '';
        display: table;
        clear: both;
      }
    `}

    ${backgroundImage &&
    css`
      background-image: url(${backgroundImage});
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
    `}
  `
)

const ColumnContentWrapper = styled.div(
  ({ center }) =>
    css`
      ${tw`relative z-10 h-full`}
      ${center && tw`flex flex-col w-full justify-center`}
    `
)
const ColumnContent = styled.div(
  ({ padding, theme }) =>
    css`
      ${padding &&
      css`
        padding: ${theme.spacing[padding] || theme.spacing[padding]};
      `}
    `
)

const BackgroundImage = tw(Image)`absolute inset-0`

/**
 * Column to be placed in a `<Columns />` element.
 *
 * @example
 * <Columns maxColumns="2">
 * <Column>
 *
 * # Example text
 *
 * Default Layout.
 *
 * </Column>
 * <Column>
 *
 * # Example text
 *
 * Default Layout.
 *
 * </Column>
 * <Column colorSet="blue">
 *
 * # Example Text
 *
 * Colored example.
 *
 * The quick brown fox jumps over the lazy dog
 *
 * </Column>
 * <Column colorSet="red">
 *
 * # Example Text
 *
 * Colored example.
 *
 * The quick brown fox jumps over the lazy dog
 *
 * </Column>
 * </Columns>
 * @example
 * <Columns>
 * <Column>
 *
 * # Little Content
 *
 * Content to the right is leading in height.
 *
 * </Column>
 * <Column>
 *
 * # Much Content
 *
 * Curabitizzle et fo shizzle fo nisi gangsta mollizzle. Suspendisse
 * fo. Own yo' odio. Sure neque. Crizzle orci. Crizzle mauris shit,
 * interdizzle a, feugiat sit amizzle, bizzle izzle, pede. Pellentesque
 * gizzle. Vestibulum for sure mi, **volutpat izzle**,
 * sagittizzle sizzle, bizzle sempizzle, velit. Crackalackin mah nizzle
 * justo et crazy. Nunc urna. Suspendisse dawg placerizzle stuff.
 * Curabitur daahng dawg ante.
 *
 * </Column>
 * <Column backgroundImage="https://source.unsplash.com/1600x900/?nature" />
 * </Columns>
 * @example
 * <Columns>
 * <Column>
 *
 * # Little Content
 *
 * Last image is leading in height due to minAspectRatio set to 9:16
 *
 * </Column>
 * <Column>
 *
 * # Content Image
 *
 * <Image src="https://source.unsplash.com/800x600/?water" />
 *
 * </Column>
 * <Column
 * backgroundImage="https://source.unsplash.com/900x1600/?people"
 * minAspectRatio="900 / 1600"
 * />
 * </Columns>
 * @example
 * <Columns>
 * <Column>
 *
 * # Little Content
 *
 * Center image has cubic min aspect ratio
 *
 * </Column>
 * <Column
 * backgroundImage="https://source.unsplash.com/800x600/?sunset"
 * minAspectRatio="800/800"
 * />
 * <Column>
 *
 * # Little Content
 *
 * </Column>
 * </Columns>
 * @example
 * <Columns>
 * <Column>
 *
 * # 100% content agnostic
 *
 * </Column>
 * <Column>
 *
 * # 100% content agnostic
 *
 * </Column>
 * <Column>
 *
 * # 100% content agnostic
 *
 * </Column>
 * </Columns>
 */
const Column = ({
  children,
  colorSet,
  colors,
  minAspectRatio,
  backgroundImage,
  backgroundImageId,
  showAnimation,
  padding,
  center,
  ...columnProps
}) => {
  const { animationClass, animationObserverProps } = useAnimation({
    show: showAnimation,
  })

  if (showAnimation) {
    columnProps.className = cx(columnProps.className, animationClass)
  }

  const hasBackground = !!colorSet || !!colors.background || !!backgroundImageId
  const contentPadding = padding || (hasBackground ? 'content-gap' : null)

  let columnContent = (
    <StyledColumn
      minAspectRatio={minAspectRatio}
      backgroundImage={backgroundImage}
      {...columnProps}
    >
      {children && (
        <ColumnContentWrapper center={center}>
          <ColumnContent padding={contentPadding}>{children}</ColumnContent>
        </ColumnContentWrapper>
      )}
      {backgroundImageId && (
        <BackgroundImage id={backgroundImageId} fit="cover" />
      )}
    </StyledColumn>
  )

  if (showAnimation) {
    columnContent = (
      <Observer {...animationObserverProps}>{columnContent}</Observer>
    )
  }

  return (
    <ColorSet name={colorSet} {...colors}>
      {columnContent}
    </ColorSet>
  )
}

Column.defaultProps = {
  center: false,
  padding: null,
  colors: {},
}

Column.propTypes = {
  children: propTypes.node,
  /** Define a color set for this box */
  colorSet: propTypes.string,
  /** Overwrite specific colors */
  colors: propTypes.object,
  /** Optional minimum aspect ratio. Either a mathematical expression or a number. ("16 / 9" or "1.5") */
  minAspectRatio: propTypes.string,
  /** External background image URI */
  backgroundImage: propTypes.string,
  /** Internal background image id */
  backgroundImageId: propTypes.string,
  /** Vertically center column content. For horizontal centering use <Center /> */
  center: propTypes.bool,
  /** Apply show animation */
  showAnimation: propTypes.string,
  /** Define the inner gab to the content */
  padding: propTypes.string,
}

export default Column
