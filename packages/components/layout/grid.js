import styled from '@emotion/styled'

const Grid = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;

  & > * {
    flex: 0 0 auto;
  }
  display: flex;
  flex-wrap: wrap;

  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(
      ${({ minWidth = '280px' }) => minWidth},
      ${({ maxWidth = '1fr' }) => maxWidth}
    )
  );
  grid-gap: ${({ theme }) => theme.spacing.s2}px;
`

export default Grid
