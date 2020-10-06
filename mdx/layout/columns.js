import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
// import { useBreakpointIndex } from '@theme-ui/match-media'
import applyContentGap from '@gatsby-mdx-suite/helpers/styling/apply-content-gap'

const ColumnsWrapper = styled.div(({ theme, maxColumns, template, center }) => {
  return css`
    ${applyContentGap({ theme })}
    ${tw`w-full grid gap-grid-gap`}
    ${maxColumns === 2 && tw`sm:grid-cols-2`}
    ${maxColumns === 3 && tw`sm:grid-cols-3`}
    ${maxColumns === 4 && tw`sm:grid-cols-2 md:grid-cols-4`}
    ${maxColumns === 5 && tw`grid-cols-2 sm:grid-cols-2 md:grid-cols-5`}
    ${maxColumns === 6 && tw`grid-cols-2 sm:grid-cols-3 md:grid-cols-6`}
    ${maxColumns === 7 && tw`grid-cols-2 sm:grid-cols-4 md:grid-cols-7`}
    ${maxColumns === 8 && tw`grid-cols-2 sm:grid-cols-4 md:grid-cols-8`}
    ${maxColumns === 9 && tw`grid-cols-3 sm:grid-cols-5 md:grid-cols-9`}
    ${maxColumns === 10 && tw`grid-cols-3 sm:grid-cols-5 md:grid-cols-10`}
    ${maxColumns === 11 && tw`grid-cols-4 sm:grid-cols-6 md:grid-cols-11`}
    ${maxColumns === 12 && tw`grid-cols-4 sm:grid-cols-6 md:grid-cols-12`}

    ${template &&
    css`
      @media screen and (min-width: ${theme.screens.sm}) {
        grid-template-columns: ${template};
      }
    `}

    ${center &&
    css`
      text-align: center;
    `}
  `
})

/**
 * Display content next to each other.
 *
 * **Note:**
 *
 * If you need to use multiple elements within a column or want control over colors,
 * you should use the `<Column/>` element to wrap a single column.
 *
 *
 * @example
 * <Columns>
 * <Image id="randomImageId" />
 * <Image id="randomImageId" />
 * <Image id="randomImageId" />
 * <Image id="randomImageId" />
 * </Columns>
 * @example
 * <Columns maxColumns="2">
 * <Image id="randomImageId" />
 * <Image id="randomImageId" />
 * <Image id="randomImageId" />
 * <Image id="randomImageId" />
 * </Columns>
 *
 * @example
 *
 * <Columns center>
 * <Column center>
 *
 * ## Some Content
 *
 * Just as a demo
 *
 * A very long one
 *
 * To get some extra lines
 *
 * </Column>
 * <Column center>
 * <Image id="randomImageId" />
 * </Column>
 * </Columns>
 * @example
 * <Columns>
 * <Column>
 *
 * # Example text
 *
 * The quick brown fox jumps over the lazy dog
 *
 * </Column>
 * <Column colorSet="blue">
 *
 * # Example Text
 *
 * The quick brown fox jumps over the lazy dog
 *
 * </Column>
 * <Column backgroundImageId="randomPictureId" minAspectRatio="9/16" />
 * </Columns>
 * @example
 * <Columns template="16fr 9fr">
 * <Column colorSet="blue">
 *
 * # Example Text
 *
 * The quick brown fox jumps over the lazy dog
 *
 * </Column>
 * <Column backgroundImageId="randomPictureId" minAspectRatio="9/16" />
 * </Columns>
 */
export default function Columns({ children, maxColumns, reverseAt, ...props }) {
  const currentBreakpoint = 0 // @todo useBreakpointIndex()

  if (!children) {
    return null
  }

  children = Array.isArray(children) ? children : [children]
  maxColumns = parseInt(maxColumns) > 0 ? parseInt(maxColumns) : children.length
  if (maxColumns > 12) {
    maxColumns = 12
  }

  if (currentBreakpoint >= reverseAt) {
    children = children.slice().reverse()
  }

  return (
    <ColumnsWrapper maxColumns={maxColumns} {...props}>
      {children}
    </ColumnsWrapper>
  )
}

Columns.displayName = 'Columns'

Columns.defaultProps = {
  center: false,
}

Columns.propTypes = {
  children: propTypes.node.isRequired,
  /** Maximum number of columns. Defaults to number of items. */
  maxColumns: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /**
   * Custom css grid columns template. Applied at the first breakpoint.
   *
   * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
   */
  template: propTypes.string,
  /** Reverse the order of all columns as soon given breakpoint is reached */
  reverseAt: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /** Center text content */
  center: propTypes.bool,
}
