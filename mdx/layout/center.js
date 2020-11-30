import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const StyledCenter = styled.div(
  () => css`
    margin: 0 auto;
    text-align: center;
  `
)

/**
 * Centers anything inside of it to the horizontal center of the screen.
 *
 * @example
 * <Center>
 *
 * I sooo centered
 *
 * </Center>
 */
const Center = (props) => <StyledCenter {...props} />

export default Center
