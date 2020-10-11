import React from 'react'
import propTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import tw from 'twin.macro'

const GridWrapper = styled.div(
  ({ theme, minWidth, maxWidth, center }) => css`
    ${tw`my-content-gap`}

    /* ensure full width when within viewport/flex box container */
    ${tw`w-full`}

    /* Fallback grid based on flexbox */
    ${tw`flex flex-wrap items-stretch`}

    /* Actual grid */
    ${tw`grid gap-grid-gap`}
    grid-template-columns: repeat(auto-fit, minmax(${minWidth}, ${maxWidth}));

    /* Ensure all images are responsive within the grid. */
    img,
    svg,
    video {
      ${tw`w-full h-auto`}
    }

    /* Center items */
    ${center && tw`items-center justify-center`}
  `
)

const GridItem = styled.div(
  ({ center }) => css`
    ${center &&
    css`
      ${tw`flex flex-col items-center text-center`}

      > * {
        ${tw`w-full`}

        > * {
          ${tw`my-auto`}
        }
      }
    `}
  `
)

/**
 * Renders a grid with a dynamic number of columns.
 *
 * The column width and count depends on a given minimum and maximum column width.
 *
 * This is a powerful but complex Component. Usually `<Columns />` should be the choice.
 *
 * @example
 * <Grid>
 * <Image src="https://source.unsplash.com/random#1" />
 * <Image src="https://source.unsplash.com/random#2" />
 * </Grid>
 * @example
 * <Grid>
 * <Image src="https://source.unsplash.com/random#1" />
 * <Image src="https://source.unsplash.com/random#2" />
 * <Image src="https://source.unsplash.com/random#3" />
 * <Image src="https://source.unsplash.com/random#4" />
 * </Grid>
 * @example
 * <Grid>
 * <Image src="https://source.unsplash.com/random#1" />
 * <Image src="https://source.unsplash.com/random#2" />
 * <Image src="https://source.unsplash.com/random#3" />
 * <Image src="https://source.unsplash.com/random#4" />
 * <Image src="https://source.unsplash.com/random#5" />
 * <Image src="https://source.unsplash.com/random#6" />
 * <Image src="https://source.unsplash.com/random#7" />
 * <Image src="https://source.unsplash.com/random#8" />
 * </Grid>
 * @example
 * <Grid minWidth="1fr" maxWidth="420px">
 * <Image src="https://source.unsplash.com/random#1" />
 * <Image src="https://source.unsplash.com/random#2" />
 * <Image src="https://source.unsplash.com/random#3" />
 * <Image src="https://source.unsplash.com/random#4" />
 * <Image src="https://source.unsplash.com/random#5" />
 * <Image src="https://source.unsplash.com/random#6" />
 * <Image src="https://source.unsplash.com/random#7" />
 * <Image src="https://source.unsplash.com/random#8" />
 * </Grid>
 */
export default function Grid({ children, ...props }) {
  if (!children || !children.length) {
    return null
  }

  if (!Array.isArray(children)) {
    children = [children]
  }

  children = children.map((child, i) => (
    <GridItem key={i} center={props.center}>
      {child}
    </GridItem>
  ))

  return <GridWrapper {...props}>{children}</GridWrapper>
}

Grid.displayName = 'Grid'

Grid.defaultProps = {
  minWidth: '280px',
  maxWidth: '1fr',
}

Grid.propTypes = {
  /** Minimum width for every grid column. Defaults to 280px */
  minWidth: propTypes.string,
  /** Maximum width for every grid column */
  maxWidth: propTypes.string,
  /** Horizontally center grid items */
  center: propTypes.bool,
  children: propTypes.node.isRequired,
}
