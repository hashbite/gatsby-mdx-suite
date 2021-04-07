import React, { useMemo, useEffect, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import { useBreakpoint } from '@gatsby-mdx-suite/helpers/hooks/use-breakpoint'
import verticalRhythm from '@gatsby-mdx-suite/helpers/styling/vertical-rhythm'

const ColumnsWrapper = styled.div(
  ({ theme, minColumns, maxColumns, template, templateAt, center }) => {
    return css`
      ${tw`w-full grid gap-grid-gap`}
      ${verticalRhythm}

    ${template
        ? css`
            ${templateAt
              ? css`
                  @media (min-width: ${theme.screens[templateAt]}) {
                    grid-template-columns: ${template};
                  }
                `
              : css`
                  grid-template-columns: ${template};
                `}
          `
        : css`
            grid-template-columns: ${theme.gridTemplateColumns[minColumns]};
            ${maxColumns === 2 && tw`md:grid-cols-2`}
            ${maxColumns === 3 && tw`md:grid-cols-3`}
            ${maxColumns === 4 && tw`md:grid-cols-2 lg:grid-cols-4`}
            ${maxColumns === 5 && tw`grid-cols-2 md:grid-cols-2 lg:grid-cols-5`}
            ${maxColumns === 6 && tw`grid-cols-2 md:grid-cols-3 lg:grid-cols-6`}
            ${maxColumns === 7 && tw`grid-cols-2 md:grid-cols-4 lg:grid-cols-7`}
            ${maxColumns === 8 && tw`grid-cols-2 md:grid-cols-4 lg:grid-cols-8`}
            ${maxColumns === 9 && tw`grid-cols-3 md:grid-cols-5 lg:grid-cols-9`}
            ${maxColumns === 10 &&
            tw`grid-cols-3 md:grid-cols-5 lg:grid-cols-10`}
            ${maxColumns === 11 &&
            tw`grid-cols-4 md:grid-cols-6 lg:grid-cols-11`}
            ${maxColumns === 12 &&
            tw`grid-cols-4 md:grid-cols-6 lg:grid-cols-12`};
          `}

    ${center &&
      css`
        text-align: center;
      `}
    `
  }
)

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
  const originalColumns = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  )
  const [columns, setColumns] = useState(originalColumns)

  const breakpoints = useBreakpoint()

  // Set max columns based on number of columns
  const realMaxColumns = useMemo(() => {
    const desiredColumns =
      parseInt(maxColumns) > 0 ? parseInt(maxColumns) : columns.length
    if (desiredColumns > 12) {
      return 12
    }
    return desiredColumns
  }, [maxColumns, columns.length])

  // Reverse columns based on reverseAt
  useEffect(() => {
    if (breakpoints[reverseAt]) {
      setColumns(originalColumns.slice().reverse())
      return
    }
    setColumns(originalColumns.slice())
  }, [breakpoints, reverseAt, originalColumns])

  if (!originalColumns.length) {
    return null
  }

  return (
    <ColumnsWrapper maxColumns={realMaxColumns} {...props}>
      {columns}
    </ColumnsWrapper>
  )
}

Columns.displayName = 'Columns'

Columns.defaultProps = {
  center: false,
  minColumns: 1,
}

Columns.propTypes = {
  children: propTypes.node.isRequired,
  /** Minimum number of columns for the smallest screen. */
  minColumns: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /** Maximum number of columns for the biggest screen. Defaults to number of items. Maximum is 12. */
  maxColumns: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /** Reverse the order of all columns as soon given screen size is reached */
  reverseAt: propTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  /** Center text content */
  center: propTypes.bool,
  /**
   * Custom css grid columns template.
   *
   * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
   */
  template: propTypes.string,
  /**
   * Apply the template at the given screen size. By default the template is applied to all screen sizes.
   *
   * See: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
   */
  templateAt: propTypes.string,
}
