import propTypes from 'prop-types'
import styled from '@emotion/styled'

const Grid = styled.div`
  /* ensure full width when within viewport/flex box container */
  width: 100%;

  /* Fallback grid based on flexbox */
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;

  & > * {
    flex: 0 0 auto;
  }

  /* Actual grid */
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(
      ${({ minWidth = '280px' }) => minWidth},
      ${({ maxWidth = '1fr' }) => maxWidth}
    )
  );
  grid-gap: ${({ theme }) => theme.spacing.s2}px;

  /* Ensure all images are responsive within the grid. */
  & img {
    width: 100%;
    height: auto;
  }
`

Grid.propTypes = {
  /** Minimum width for every grid column. Defaults to 280px */
  minWidth: propTypes.string,
  /** Maximum width for every grid column */
  maxWidth: propTypes.string,
}

export default Grid
