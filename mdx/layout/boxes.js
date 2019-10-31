import styled from '@emotion/styled'

const Boxes = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.sizes.gridGutter || 16}px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${({ theme }) => theme.sizes.gridColumnWidth || 128}px, 1fr)
  );
  grid-auto-rows: 1fr;
`

export default Boxes
