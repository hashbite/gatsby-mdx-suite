import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'
import Image from '@gatsby-mdx-suite/mdx-image/image'

const StyledColumn = styled.div(
  ({ theme, minAspectRatio, backgroundImage }) => css`
    ${tw`relative h-full`}

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

const ColumnContent = tw.div`p-8 relative z-10`

/**
 * Column to be placed in a `<Columns />` element.
 *
 * @example
 * <Columns>
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
 * <Column backgroundImageId="randomPictureId" />
 * </Columns>
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
 *
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
  ...restProps
}) => {
  return (
    <ColorSet name={colorSet} {...colors}>
      <StyledColumn
        minAspectRatio={minAspectRatio}
        backgroundImage={backgroundImage}
        {...restProps}
      >
        {children && <ColumnContent>{children}</ColumnContent>}
        {backgroundImageId && <Image id={backgroundImageId} fit="fill" />}
      </StyledColumn>
    </ColorSet>
  )
}

Column.defaultProps = {}

Column.propTypes = {
  children: propTypes.node,
  /* Define a color set for this box */
  colorSet: propTypes.string,
  /* Overwrite specific colors */
  colors: propTypes.object,
  /* Optional minimum aspect ratio. Either a mathematical expression or a number. ("16 / 9" or "1.5") */
  minAspectRatio: propTypes.string,
  /* External background image URI */
  backgroundImage: propTypes.string,
  /* Internal background image id */
  backgroundImageId: propTypes.string,
}

export default Column
