import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import propTypes from 'prop-types'

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

Center.propTypes = {
  children: propTypes.node.isRequired,
}

export default Center
